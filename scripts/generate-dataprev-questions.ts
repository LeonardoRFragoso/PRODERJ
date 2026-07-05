import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import OpenAI from 'openai';

interface ScriptArgs {
  subject: string;
  topic: string;
  difficulty: 'medio' | 'dificil';
  quantity: number;
}

function parseArgs(): ScriptArgs {
  const args = process.argv.slice(2);
  const parsed: Partial<ScriptArgs> = {
    subject: 'especificos_dev',
    topic: '',
    difficulty: 'dificil',
    quantity: 5,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--subject' && args[i + 1]) parsed.subject = args[i + 1];
    if (args[i] === '--topic' && args[i + 1]) parsed.topic = args[i + 1];
    if (args[i] === '--difficulty' && args[i + 1]) parsed.difficulty = args[i + 1] as 'medio' | 'dificil';
    if (args[i] === '--quantity' && args[i + 1]) parsed.quantity = Math.min(parseInt(args[i + 1]) || 5, 10);
  }

  if (!parsed.topic) {
    console.error('Usage: npx tsx scripts/generate-dataprev-questions.ts --subject especificos_dev --topic "Microsserviços" --difficulty dificil --quantity 5');
    process.exit(1);
  }

  return parsed as ScriptArgs;
}

const SUBJECT_NAMES: Record<string, string> = {
  portugues: 'Língua Portuguesa',
  ingles: 'Língua Inglesa',
  logica: 'Raciocínio Lógico Matemático',
  atualidades_ia: 'Atualidades e Inteligência Artificial',
  legislacao_seguranca: 'Legislação acerca de Segurança da Informação e Proteção de Dados',
  especificos_dev: 'Conhecimentos Específicos - Desenvolvimento de Software',
};

async function main() {
  const args = parseArgs();
  const apiKey = process.env.ZAI_API_KEY;
  const baseUrl = process.env.ZAI_BASE_URL || 'https://api.z.ai/api/paas/v4';
  const model = process.env.ZAI_MODEL || 'glm-5.2';

  if (!apiKey) {
    console.error('ZAI_API_KEY não configurada. Defina no .env.local ou ambiente.');
    process.exit(1);
  }

  const subjectName = SUBJECT_NAMES[args.subject] || args.subject;
  const weight = args.subject === 'especificos_dev' ? 2.5 : 1;

  const prompt = `Você é um elaborador de questões de concurso público especializado na banca FGV.

Gere ${args.quantity} questão(ões) autorais para o concurso Dataprev 2026.
Cargo: Analista de Tecnologia da Informação — Perfil 3: Desenvolvimento de Software
Disciplina: ${subjectName} (${args.subject})
Tópico: ${args.topic}
Dificuldade: ${args.difficulty === 'dificil' ? 'DIFÍCIL - cenários complexos, alternativas próximas' : 'MÉDIO - cenários moderados'}

Regras: questões autorais, estilo FGV, 5 alternativas (A-E), uma correta, explicação detalhada.
Retorne JSON: { "questions": [{ "subject": "${args.subject}", "subjectName": "${subjectName}", "subtopic": "${args.topic}", "difficulty": "${args.difficulty}", "weight": ${weight}, "text": "...", "options": [{"letter":"A","text":"..."},...], "correctAnswer": "C", "explanation": "...", "tags": [...], "source": "Questão autoral gerada com apoio de IA" }] }`;

  const client = new OpenAI({ apiKey, baseURL: baseUrl, timeout: 30000, maxRetries: 1 });

  console.log(`Gerando ${args.quantity} questões sobre "${args.topic}" (${args.subject})...`);

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'Você é um elaborador de questões. Responda apenas com JSON válido.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    console.error('Resposta vazia.');
    process.exit(1);
  }

  const parsed = JSON.parse(content);
  const outputDir = join(process.cwd(), 'generated', 'dataprev', 'drafts');
  mkdirSync(outputDir, { recursive: true });

  const filename = `${args.subject}_${args.topic.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.json`;
  const outputPath = join(outputDir, filename);
  writeFileSync(outputPath, JSON.stringify(parsed, null, 2));

  console.log(`✅ ${parsed.questions?.length || 0} questões geradas em: ${outputPath}`);
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
