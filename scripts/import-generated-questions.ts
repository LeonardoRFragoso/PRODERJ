import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { questionsDataprevDev } from '../src/data/questionsDataprevDev';

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

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): Set<string> {
  return new Set(normalizeText(text).split(' ').filter(t => t.length > 2));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
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

  const existingTexts = questionsDataprevDev.map(q => tokenize(q.text));
  const existingIds = questionsDataprevDev.map(q => q.id);
  let maxId = Math.max(...existingIds);

  const newQuestions: (GeneratedQ & { id: number })[] = [];
  let skipped = 0;

  for (const file of files) {
    const content = readFileSync(join(draftsDir, file), 'utf8');
    const parsed = JSON.parse(content);
    const questions: GeneratedQ[] = parsed.questions || [];

    for (const q of questions) {
      const qTokens = tokenize(q.text);
      let isDup = false;
      for (const et of existingTexts) {
        if (jaccard(qTokens, et) > 0.82) {
          isDup = true;
          break;
        }
      }
      if (isDup) {
        console.log(`⚠️  Pulando duplicada: "${q.text.substring(0, 60)}..."`);
        skipped++;
        continue;
      }
      maxId++;
      const newQ = { ...q, id: maxId };
      newQuestions.push(newQ);
      existingTexts.push(qTokens);
    }
  }

  if (newQuestions.length === 0) {
    console.log('Nenhuma questão nova para importar (todas duplicadas).');
    process.exit(0);
  }

  const allQuestions = [...questionsDataprevDev, ...newQuestions].sort((a, b) => a.id - b.id);

  const importRecord = {
    importedAt: new Date().toISOString(),
    importedCount: newQuestions.length,
    skippedDuplicates: skipped,
    newMaxId: maxId,
    newIds: newQuestions.map(q => (q as GeneratedQ & { id: number }).id),
  };

  console.log('=== RELATÓRIO DE IMPORTAÇÃO ===');
  console.log(JSON.stringify(importRecord, null, 2));

  const outputPath = join(process.cwd(), 'generated', 'dataprev', 'import_report.json');
  writeFileSync(outputPath, JSON.stringify(importRecord, null, 2));
  console.log(`\nRelatório salvo em: ${outputPath}`);
  console.log(`\nPara finalizar, adicione as ${newQuestions.length} questões ao src/data/questionsDataprevDev.ts`);
  console.log(`Novos IDs: ${importRecord.newIds.join(', ')}`);
}

main();
