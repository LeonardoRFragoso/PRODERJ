import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

interface ReviewRequestBody {
  question: {
    text: string;
    options: { letter: string; text: string }[];
    correctAnswer: string;
    explanation: string;
    subject: string;
    subjectName: string;
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.ZAI_API_KEY;
  const baseUrl = process.env.ZAI_BASE_URL || 'https://api.z.ai/api/paas/v4';
  const model = process.env.ZAI_MODEL || 'glm-5.2';

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
  const prompt = `Revise a seguinte questão de concurso público e identifique possíveis problemas.

Questão:
- Disciplina: ${q.subjectName}
- Enunciado: ${q.text}
- Alternativas: ${q.options.map(o => `${o.letter}) ${o.text}`).join('\n')}
- Resposta correta: ${q.correctAnswer}
- Explicação: ${q.explanation}

Verifique:
1. A resposta correta está tecnicamente correta?
2. Há ambiguidade entre as alternativas?
3. A explicação justifica adequadamente?
4. Há alternativas obviamente erradas?
5. O nível de dificuldade é apropriado?
6. Há erros de português ou formatação?

Retorne JSON:
{
  "approved": true/false,
  "issues": ["problema 1", "problema 2"],
  "suggestions": ["sugestão 1"],
  "overallQuality": "alta" | "media" | "baixa"
}`;

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: 'Você é um revisador de questões de concurso. Responda apenas com JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ success: false, error: 'Resposta vazia.' });
    }

    const result = JSON.parse(content);
    return res.status(200).json({ success: true, review: result });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    return res.status(500).json({
      success: false,
      error: 'Erro ao revisar questão.',
      details: err.message,
    });
  }
}
