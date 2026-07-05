import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { questionsDataprevDev } from '../src/data/questionsDataprevDev';

interface GeneratedQ {
  text: string;
  subject: string;
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

  const officialTokens = questionsDataprevDev.map(q => ({ id: q.id, tokens: tokenize(q.text) }));

  let totalDuplicates = 0;
  let totalChecked = 0;

  for (const file of files) {
    const content = readFileSync(join(draftsDir, file), 'utf8');
    const parsed = JSON.parse(content);
    const questions: GeneratedQ[] = parsed.questions || [];

    for (let i = 0; i < questions.length; i++) {
      const qTokens = tokenize(questions[i].text);
      let maxSim = 0;
      let similarId: number | undefined;

      for (const eq of officialTokens) {
        const sim = jaccard(qTokens, eq.tokens);
        if (sim > maxSim) {
          maxSim = sim;
          similarId = eq.id;
        }
      }

      totalChecked++;
      if (maxSim > 0.82) {
        console.log(`⚠️  ${file} Q${i + 1}: DUPLICADA (sim=${maxSim.toFixed(2)}) com Q${similarId} oficial`);
        totalDuplicates++;
      } else if (maxSim > 0.6) {
        console.log(`🔶 ${file} Q${i + 1}: SIMILAR (sim=${maxSim.toFixed(2)}) com Q${similarId} oficial`);
      } else {
        console.log(`✅ ${file} Q${i + 1}: OK (max_sim=${maxSim.toFixed(2)})`);
      }
    }
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`Verificadas: ${totalChecked}`);
  console.log(`Duplicadas: ${totalDuplicates}`);
  process.exit(totalDuplicates > 0 ? 1 : 0);
}

main();
