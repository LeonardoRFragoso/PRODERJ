/**
 * Script para integrar questões geradas pela OpenAI aos arquivos do projeto
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  generated: path.join(__dirname, '..', 'generated'),
  questionsAnalista: path.join(__dirname, '..', 'src', 'data', 'questions.ts'),
  questionsTecnico: path.join(__dirname, '..', 'src', 'data', 'questionsTecnico.ts'),
};

// Encontra o arquivo mais recente de questões geradas
function findLatestFile(cargo) {
  const files = fs.readdirSync(PATHS.generated)
    .filter(f => f.startsWith(`questoes-${cargo}-`) && f.endsWith('.json'))
    .sort()
    .reverse();
  
  return files.length > 0 ? path.join(PATHS.generated, files[0]) : null;
}

// Lê questões geradas
function loadGeneratedQuestions(cargo) {
  const file = findLatestFile(cargo);
  if (!file) {
    console.log(`Nenhum arquivo encontrado para ${cargo}`);
    return [];
  }
  
  console.log(`Lendo: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Formata questões para TypeScript
function formatQuestionsTS(questions, startId) {
  return questions.map((q, idx) => {
    const id = startId + idx;
    const options = q.options.map(o => 
      `      { letter: '${o.letter}', text: '${o.text.replace(/'/g, "\\'")}' }`
    ).join(',\n');
    
    return `  {
    id: ${id},
    subject: '${q.subject}',
    subjectName: '${q.subjectName}',
    weight: ${q.weight},
    text: '${q.text.replace(/'/g, "\\'")}',
    options: [
${options}
    ],
    correctAnswer: '${q.correctAnswer}',
    explanation: '${q.explanation.replace(/'/g, "\\'")}',
  }`;
  }).join(',\n');
}

// Integra questões ao arquivo
function integrateToFile(filePath, questions, startId, arrayName) {
  if (questions.length === 0) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Encontra o fechamento do array
  const arrayEndRegex = new RegExp(`^\\];\\s*$`, 'm');
  const match = content.match(arrayEndRegex);
  
  if (!match) {
    console.error(`Não encontrou final do array em ${filePath}`);
    return;
  }
  
  // Formata as novas questões
  const newQuestions = formatQuestionsTS(questions, startId);
  
  // Insere antes do ];
  const insertPosition = content.lastIndexOf('];');
  const before = content.substring(0, insertPosition);
  const after = content.substring(insertPosition);
  
  // Adiciona comentário e questões
  const addition = `
  // ========================================
  // QUESTÕES GERADAS VIA OPENAI - ${new Date().toISOString().split('T')[0]}
  // ========================================
${newQuestions},
`;
  
  content = before + addition + after;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${questions.length} questões integradas em ${path.basename(filePath)}`);
}

// Main
async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('     INTEGRAÇÃO DE QUESTÕES OPENAI AO PROJETO');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  // Carrega questões
  const analistaQuestions = loadGeneratedQuestions('analista');
  const tecnicoQuestions = loadGeneratedQuestions('tecnico');
  
  console.log(`\nQuestões encontradas:`);
  console.log(`  Analista: ${analistaQuestions.length}`);
  console.log(`  Técnico: ${tecnicoQuestions.length}\n`);
  
  if (analistaQuestions.length > 0) {
    integrateToFile(PATHS.questionsAnalista, analistaQuestions, 200, 'questions');
  }
  
  if (tecnicoQuestions.length > 0) {
    integrateToFile(PATHS.questionsTecnico, tecnicoQuestions, 1200, 'questionsTecnico');
  }
  
  console.log('\n✨ Integração concluída!');
  console.log('Execute "npm run build" para compilar.');
}

main().catch(console.error);
