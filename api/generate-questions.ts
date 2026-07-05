import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { checkAdminToken, checkRateLimit, secureLog, getPrimaryModel, getFallbackModel, getMaxQuantity, getModelTemperature, isFreeModelMode } from './_lib/rateLimiter.js';

interface GenerateRequestBody {
  contestId: string;
  careerId: string;
  subject: string;
  subjectName: string;
  topic: string;
  difficulty: 'medio' | 'dificil';
  quantity: number;
  mode: 'hard' | 'weak-topics' | 'custom';
  weakTopics?: string[];
}

const PROMPT_VERSION = '1.1.0';
const API_TIMEOUT_MS = 60000;

const activeSessions = new Map<string, number>();
const SESSION_TTL_MS = 65_000;

function acquireSession(req: VercelRequest): boolean {
  const sessionKey = (req.headers['x-session-id'] as string) || req.headers['x-ai-admin-token'] as string || 'default';
  const now = Date.now();
  for (const [k, t] of activeSessions) {
    if (now - t > SESSION_TTL_MS) activeSessions.delete(k);
  }
  if (activeSessions.has(sessionKey)) return false;
  activeSessions.set(sessionKey, now);
  return true;
}

function releaseSession(req: VercelRequest): void {
  const sessionKey = (req.headers['x-session-id'] as string) || req.headers['x-ai-admin-token'] as string || 'default';
  activeSessions.delete(sessionKey);
}

function validateRequest(body: Partial<GenerateRequestBody>): string[] {
  const errors: string[] = [];
  const maxQty = getMaxQuantity();

  if (!body.contestId) errors.push('contestId é obrigatório');
  if (!body.careerId) errors.push('careerId é obrigatório');
  if (!body.subject) errors.push('subject é obrigatório');
  if (!body.subjectName) errors.push('subjectName é obrigatório');
  if (!body.topic) errors.push('topic é obrigatório');
  if (!body.difficulty || !['medio', 'dificil'].includes(body.difficulty)) {
    errors.push('difficulty deve ser "medio" ou "dificil"');
  }
  if (!body.quantity || typeof body.quantity !== 'number') {
    errors.push('quantity é obrigatório e deve ser um número');
  } else if (body.quantity < 1) {
    errors.push('quantity deve ser >= 1');
  } else if (body.quantity > maxQty) {
    errors.push(`quantity máximo é ${maxQty}${isFreeModelMode() ? ' (modo econômico)' : ''}`);
  }
  if (!body.mode || !['hard', 'weak-topics', 'custom'].includes(body.mode)) {
    errors.push('mode deve ser "hard", "weak-topics" ou "custom"');
  }

  return errors;
}

function buildDataprevQuestionPrompt(request: GenerateRequestBody): string {
  const weakTopicsSection = request.weakTopics && request.weakTopics.length > 0
    ? `\n\nTópicos fracos identificados (priorize estes):\n${request.weakTopics.map(t => `- ${t}`).join('\n')}`
    : '';

  const difficultyInstruction = request.difficulty === 'dificil'
    ? `Dificuldade: DIFÍCIL
- Use cenários complexos e situações que exigem raciocínio profundo
- Alternativas devem ser muito próximas, com diferenças sutis
- Evite questões memorização direta — prefira aplicação prática
- Inclua pegadinhas conceituais comuns`
    : `Dificuldade: MÉDIO
- Use cenários moderados
- Alternativas plausíveis mas com distinção clara para quem domina o tema`;

  return `Você é um elaborador de questões de concurso público especializado na banca FGV.

Gere ${request.quantity} questão(ões) autorais para o concurso Dataprev 2026.

Cargo: Analista de Tecnologia da Informação — Perfil 3: Desenvolvimento de Software

Disciplina: ${request.subjectName} (${request.subject})
Tópico: ${request.topic}
${difficultyInstruction}
${weakTopicsSection}

Regras obrigatórias:
- Não copie questões oficiais.
- Não reproduza texto de provas anteriores.
- Crie questões autorais.
- Use estilo FGV.
- Use enunciados interpretativos.
- Use cenários práticos.
- Use alternativas plausíveis e próximas.
- Evite questões fáceis demais.
- Evite alternativas obviamente erradas.
- Use 5 alternativas: A, B, C, D, E.
- Apenas uma alternativa correta.
- A resposta correta deve estar tecnicamente correta e não pode ter ambiguidade.
- As demais alternativas devem ser plausíveis, mas incorretas por detalhe técnico.
- A explicação deve justificar a correta e, quando possível, apontar por que as demais estão erradas.
- O conteúdo deve pertencer ao edital Dataprev 2026.
- Retorne somente JSON válido.
- Não use Markdown.
- Não use comentários fora do JSON.

Formato obrigatório de resposta:

{
  "questions": [
    {
      "subject": "${request.subject}",
      "subjectName": "${request.subjectName}",
      "subtopic": "${request.topic}",
      "difficulty": "${request.difficulty}",
      "weight": ${request.subject === 'especificos_dev' ? '2.5' : '1'},
      "text": "Enunciado...",
      "options": [
        { "letter": "A", "text": "..." },
        { "letter": "B", "text": "..." },
        { "letter": "C", "text": "..." },
        { "letter": "D", "text": "..." },
        { "letter": "E", "text": "..." }
      ],
      "correctAnswer": "C",
      "explanation": "Explicação técnica...",
      "tags": ["dataprev", "fgv", "${request.subject}"],
      "source": "Questão autoral gerada com apoio de IA, baseada no edital Dataprev 2026 e revisada antes do uso."
    }
  ]
}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const endpoint = '/api/generate-questions';
  const primaryModel = getPrimaryModel();
  const fallbackModel = getFallbackModel();
  const temperature = getModelTemperature();
  let usedModel = primaryModel;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  if (!checkAdminToken(req)) {
    secureLog({ timestamp: new Date().toISOString(), endpoint, status: 401, ipHash: 'unknown', model: primaryModel, success: false, errorType: 'unauthorized' });
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const rateLimit = checkRateLimit(req);
  if (!rateLimit.allowed) {
    secureLog({ timestamp: new Date().toISOString(), endpoint, status: 429, ipHash: rateLimit.ipHash, model: primaryModel, success: false, errorType: 'rate_limited' });
    return res.status(429).json({ success: false, error: rateLimit.reason || 'Limite de geração atingido. Tente novamente mais tarde.' });
  }

  if (!acquireSession(req)) {
    secureLog({ timestamp: new Date().toISOString(), endpoint, status: 429, ipHash: rateLimit.ipHash, model: primaryModel, success: false, errorType: 'session_busy' });
    return res.status(429).json({ success: false, error: 'Já existe uma geração em andamento. Aguarde.' });
  }

  const apiKey = process.env.ZAI_API_KEY;
  const baseUrl = process.env.ZAI_BASE_URL || 'https://api.z.ai/api/paas/v4';

  if (!apiKey) {
    releaseSession(req);
    return res.status(503).json({
      success: false,
      error: 'ZAI_API_KEY não configurada no servidor. Configure a variável de ambiente na Vercel.',
    });
  }

  const body = req.body as Partial<GenerateRequestBody>;
  const validationErrors = validateRequest(body);
  if (validationErrors.length > 0) {
    releaseSession(req);
    return res.status(400).json({
      success: false,
      error: 'Validação falhou',
      errors: validationErrors,
    });
  }

  const request = body as GenerateRequestBody;

  const client = new OpenAI({
    apiKey,
    baseURL: baseUrl,
    timeout: API_TIMEOUT_MS,
    maxRetries: 1,
  });

  const prompt = buildDataprevQuestionPrompt(request);

  try {
    let completion;
    try {
      completion = await client.chat.completions.create({
        model: primaryModel,
        messages: [
          { role: 'system', content: 'Você é um elaborador de questões de concurso público especializado. Responda apenas com JSON válido. Não use raciocínio interno.' },
          { role: 'user', content: prompt },
        ],
        temperature,
        response_format: { type: 'json_object' },
      });
    } catch (primaryErr: unknown) {
      const pErr = primaryErr as { status?: number; message?: string };
      if (pErr.status === 429 || (pErr.message && pErr.message.includes('Insufficient balance'))) {
        secureLog({ timestamp: new Date().toISOString(), endpoint, status: pErr.status || 429, quantity: request.quantity, ipHash: rateLimit.ipHash, model: primaryModel, success: false, errorType: 'primary_failed_fallback' });
        usedModel = fallbackModel;
        completion = await client.chat.completions.create({
          model: fallbackModel,
          messages: [
            { role: 'system', content: 'Você é um elaborador de questões de concurso público especializado. Responda apenas com JSON válido. Não use raciocínio interno.' },
            { role: 'user', content: prompt },
          ],
          temperature,
          response_format: { type: 'json_object' },
        });
      } else {
        throw primaryErr;
      }
    }

    releaseSession(req);

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({
        success: false,
        error: 'Resposta vazia da API Z.ai.',
      });
    }

    let parsed: { questions?: unknown[] };
    try {
      parsed = JSON.parse(content);
    } catch {
      return res.status(500).json({
        success: false,
        error: 'JSON inválido retornado pela API Z.ai.',
        rawContent: content.substring(0, 500),
      });
    }

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      return res.status(500).json({
        success: false,
        error: 'Resposta não contém array "questions".',
      });
    }

    const generatedAt = new Date().toISOString();
    const questions = parsed.questions.map((q: unknown) => {
      const qObj = q as Record<string, unknown>;
      return {
        ...qObj,
        aiGenerated: true as const,
        generationMetadata: {
          provider: 'zai' as const,
          model: usedModel,
          generatedAt,
          contestId: request.contestId,
          careerId: request.careerId,
          promptVersion: PROMPT_VERSION,
        },
      };
    });

    secureLog({ timestamp: new Date().toISOString(), endpoint, status: 200, quantity: request.quantity, ipHash: rateLimit.ipHash, model: usedModel, success: true });
    return res.status(200).json({
      success: true,
      questions,
      metadata: {
        provider: 'zai',
        model: usedModel,
        generatedAt,
        count: questions.length,
      },
    });
  } catch (error: unknown) {
    releaseSession(req);
    const err = error as { status?: number; message?: string; code?: string };
    const errorType = err.status === 401 ? 'zai_unauthorized' : err.status === 429 ? 'zai_rate_limited' : err.code === 'ETIMEDOUT' ? 'timeout' : 'server_error';
    secureLog({ timestamp: new Date().toISOString(), endpoint, status: err.status || 500, quantity: request.quantity, ipHash: rateLimit.ipHash, model: usedModel, success: false, errorType });

    if (err.status === 401) {
      return res.status(401).json({
        success: false,
        error: 'Chave da API Z.ai inválida ou não autorizada. Verifique ZAI_API_KEY.',
      });
    }

    if (err.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'Limite de requisições excedido na API Z.ai. Tente novamente em alguns minutos.',
      });
    }

    if (err.message && err.message.includes('Insufficient balance')) {
      return res.status(503).json({
        success: false,
        error: 'Saldo insuficiente na API Z.ai. Adicione créditos ou aguarde o reset do free tier.',
      });
    }

    if (err.code === 'ETIMEDOUT' || err.code === 'ECONNRESET') {
      return res.status(504).json({
        success: false,
        error: 'Timeout na comunicação com a API Z.ai. Tente novamente.',
      });
    }

    if (err.status && err.status >= 500) {
      return res.status(502).json({
        success: false,
        error: 'Erro temporário na API Z.ai. Tente novamente.',
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Erro ao gerar questões.',
      details: err.message || 'Erro desconhecido',
    });
  }
}
