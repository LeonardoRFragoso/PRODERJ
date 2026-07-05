import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { checkAdminToken, checkRateLimit, secureLog, getPrimaryModel, getFallbackModel, getModelTemperature } from './_lib/rateLimiter.js';
import { getBoardProfile, getContestReferenceProfile } from './_lib/profiles.js';

interface ReviewRequestBody {
  question: {
    text: string;
    options: { letter: string; text: string }[];
    correctAnswer: string;
    explanation: string;
    subject: string;
    subjectName: string;
  };
  contestId?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const endpoint = '/api/review-question';
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
    return res.status(429).json({ success: false, error: rateLimit.reason || 'Limite atingido. Tente novamente mais tarde.' });
  }

  const apiKey = process.env.ZAI_API_KEY;
  const baseUrl = process.env.ZAI_BASE_URL || 'https://api.z.ai/api/paas/v4';

  if (!apiKey) {
    return res.status(503).json({
      success: false,
      error: 'ZAI_API_KEY não configurada no servidor.',
    });
  }

  const body = req.body as Partial<ReviewRequestBody>;
  if (!body.question || !body.question.text) {
    return res.status(400).json({
      success: false,
      error: 'Campo "question" com "text" é obrigatório.',
    });
  }

  const client = new OpenAI({
    apiKey,
    baseURL: baseUrl,
    timeout: 20000,
    maxRetries: 1,
  });

  const q = body.question;
  const contestId = body.contestId || 'dataprev-2026';
  const contest = getContestReferenceProfile(contestId);
  const boardId = contest?.currentBoard || 'fgv';
  const board = getBoardProfile(boardId);
  const boardName = board?.name || 'FGV';
  const contestName = contest?.contestName || 'Dataprev 2026';
  const styleRules = board
    ? board.questionStyle.map(s => `- ${s}`).join('\n')
    : '- enunciados interpretativos\n- alternativas próximas';

  const prompt = `Revise a seguinte questão de concurso público considerando o padrão da banca ${boardName} e o edital ${contestName}.

Questão:
- Disciplina: ${q.subjectName}
- Enunciado: ${q.text}
- Alternativas: ${q.options.map(o => `${o.letter}) ${o.text}`).join('\n')}
- Resposta correta: ${q.correctAnswer}
- Explicação: ${q.explanation}

Estilo esperado da banca ${boardName}:
${styleRules}

Verifique obrigatoriamente:
1. Aderência ao edital ${contestName} — a questão cobre conteúdo do edital?
2. Aderência ao estilo da banca ${boardName} — segue o padrão de enunciado e alternativas?
3. A resposta correta está tecnicamente correta?
4. Há ambiguidade entre as alternativas? Existem duas respostas corretas?
5. A questão parece genérica demais?
6. Há alternativa óbvia demais (facilmente descartável)?
7. A explicação justifica adequadamente a correta e aponta o erro das demais?
8. Há cópia ou semelhança excessiva com questão já existente?
9. O nível de dificuldade é apropriado e condizente com a banca?
10. A questão realmente parece uma questão da ${boardName}?

Retorne JSON obrigatoriamente no formato:
{
  "approved": boolean,
  "score": number (0-10, qualidade geral),
  "boardStyleScore": number (0-10, aderência ao estilo da banca),
  "difficultyScore": number (0-10, adequação da dificuldade),
  "editalAdherenceScore": number (0-10, aderência ao edital),
  "warnings": ["aviso 1", "aviso 2"],
  "suggestions": ["sugestão 1", "sugestão 2"]
}`;

  try {
    let completion;
    try {
      completion = await client.chat.completions.create({
        model: primaryModel,
        messages: [
          { role: 'system', content: `Você é um revisador de questões de concurso especializado na banca ${boardName}. Responda apenas com JSON.` },
          { role: 'user', content: prompt },
        ],
        temperature,
        response_format: { type: 'json_object' },
      });
    } catch (primaryErr: unknown) {
      const pErr = primaryErr as { status?: number; message?: string };
      if (pErr.status === 429 || (pErr.message && pErr.message.includes('Insufficient balance'))) {
        usedModel = fallbackModel;
        completion = await client.chat.completions.create({
          model: fallbackModel,
          messages: [
            { role: 'system', content: `Você é um revisador de questões de concurso especializado na banca ${boardName}. Responda apenas com JSON.` },
            { role: 'user', content: prompt },
          ],
          temperature,
          response_format: { type: 'json_object' },
        });
      } else {
        throw primaryErr;
      }
    }

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ success: false, error: 'Resposta vazia.' });
    }

    const result = JSON.parse(content);
    secureLog({ timestamp: new Date().toISOString(), endpoint, status: 200, ipHash: rateLimit.ipHash, model: usedModel, success: true });
    return res.status(200).json({ success: true, review: result });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    secureLog({ timestamp: new Date().toISOString(), endpoint, status: err.status || 500, ipHash: rateLimit.ipHash, model: usedModel, success: false, errorType: 'server_error' });
    return res.status(500).json({
      success: false,
      error: 'Erro ao revisar questão.',
      details: err.message,
    });
  }
}
