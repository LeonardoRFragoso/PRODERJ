import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface GeneratedQ {
  subject: string;
  subjectName: string;
  subtopic: string;
  difficulty: string;
  weight: number;
  text: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  source: string;
}

function validate(q: GeneratedQ): string[] {
  const errors: string[] = [];
  if (!q.subject) errors.push('subject vazio');
  if (!q.subjectName) errors.push('subjectName vazio');
  if (!q.subtopic) errors.push('subtopic vazio');
  if (!q.difficulty || !['facil', 'medio', 'dificil', 'baixo', 'alto'].includes(q.difficulty)) errors.push('difficulty inválido');
  if (typeof q.weight !== 'number' || q.weight <= 0) errors.push('weight inválido');
  if (!q.text || q.text.length < 20) errors.push('text muito curto');
  if (!q.options || q.options.length !== 5) errors.push('deve ter 5 alternativas');
  if (q.options) {
    const letters = q.options.map(o => o.letter).sort();
    if (JSON.stringify(letters) !== JSON.stringify(['A', 'B', 'C', 'D', 'E'])) errors.push('alternativas devem ser A-E');
    for (const o of q.options) {
      if (!o.text || o.text.trim().length < 2) errors.push(`alternativa ${o.letter} vazia`);
    }
    const texts = q.options.map(o => o.text.trim().toLowerCase());
    if (new Set(texts).size !== texts.length) errors.push('alternativas duplicadas');
  }
  if (!q.correctAnswer || !q.options?.some(o => o.letter === q.correctAnswer)) errors.push('correctAnswer inválido');
  if (!q.explanation || q.explanation.length < 20) errors.push('explanation muito curta');
  if (!q.tags || q.tags.length === 0) errors.push('tags vazio');
  if (!q.source) errors.push('source vazio');
  return errors;
}

function main() {
  const draftsDir = join(process.cwd(), 'generated', 'dataprev', 'drafts');
  let files: string[];
  try {
    files = readdirSync(draftsDir).filter(f => f.endsWith('.json'));
  } catch {
    console.log('Nenhum diretório de drafts encontrado.');
    process.exit(0);
  }

  if (files.length === 0) {
    console.log('Nenhum draft encontrado.');
    process.exit(0);
  }

  let totalValid = 0;
  let totalInvalid = 0;

  for (const file of files) {
    const content = readFileSync(join(draftsDir, file), 'utf8');
    const parsed = JSON.parse(content);
    const questions: GeneratedQ[] = parsed.questions || [];

    for (let i = 0; i < questions.length; i++) {
      const errors = validate(questions[i]);
      if (errors.length === 0) {
        console.log(`✅ ${file} Q${i + 1}: VÁLIDA`);
        totalValid++;
      } else {
        console.log(`❌ ${file} Q${i + 1}: ${errors.join(', ')}`);
        totalInvalid++;
      }
    }
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`Válidas: ${totalValid}`);
  console.log(`Inválidas: ${totalInvalid}`);
  process.exit(totalInvalid > 0 ? 1 : 0);
}

main();
