#!/usr/bin/env node

/**
 * Script para integrar questões geradas ao questionário
 * 
 * Uso: node scripts/integrate-questions.js [cargo] [data]
 * Exemplo: node scripts/integrate-questions.js analista 2026-01-13
 */

const fs = require('fs');
const path = require('path');

const PATHS = {
  generated: path.join(__dirname, '..', 'generated'),
  questionsAnalista: path.join(__dirname, '..', 'src', 'data', 'questions.ts'),
  questionsTecnico: path.join(__dirname, '..', 'src', 'data', 'questionsTecnico.ts'),
};

// Encontra o maior ID existente no arquivo
function findMaxId(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const idMatches = content.match(/id:\s*(\d+)/g);
  if (idMatches) {
    const ids = idMatches.map(m => parseInt(m.replace('id:', '').trim()));
    return Math.max(...ids);
  }
  return 0;
}

// Encontra arquivo de questões geradas
function findGeneratedFile(cargo, data) {
  const generatedDir = PATHS.generated;
  
  if (!fs.existsSync(generatedDir)) {
    console.log('❌ Diretório "generated" não encontrado.');
    return null;
  }

  // Se data foi especificada, busca arquivo específico
  if (data) {
    const specificFile = path.join(generatedDir, `questoes-${cargo}-${data}.json`);
    if (fs.existsSync(specificFile)) {
      return specificFile;
    }
    console.log(`⚠️  Arquivo específico não encontrado: ${specificFile}`);
  }

  // Busca o arquivo mais recente
  const files = fs.readdirSync(generatedDir)
    .filter(f => f.startsWith(`questoes-${cargo}-`) && f.endsWith('.json'))
    .sort()
    .reverse();
  
  return files.length > 0 ? path.join(generatedDir, files[0]) : null;
}

// Carrega questões do arquivo JSON
function loadQuestions(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Erro ao ler arquivo: ${error.message}`);
    return [];
  }
}

// Formata uma questão para TypeScript
function formatQuestionTS(question) {
  const optionsStr = question.options.map(o => 
    `      { letter: '${o.letter}', text: \`${o.text.replace(/`/g, '\\`')}\` }`
  ).join(',\n');

  const tagsStr = question.tags ? 
    `\n    tags: [${question.tags.map(t => `'${t}'`).join(', ')}],` : '';
  
  const subtopicStr = question.subtopic ? 
    `\n    subtopic: '${question.subtopic}',` : '';
  
  const difficultyStr = question.difficulty ? 
    `\n    difficulty: '${question.difficulty}',` : '';
  
  const sourceStr = question.source ? 
    `\n    source: '${question.source}',` : '';

  return `  {
    id: ${question.id},
    subject: '${question.subject}',
    subjectName: '${question.subjectName}',${subtopicStr}${difficultyStr}
    weight: ${question.weight},
    text: \`${question.text.replace(/`/g, '\\`')}\`,
    options: [
${optionsStr}
    ],
    correctAnswer: '${question.correctAnswer}',
    explanation: \`${question.explanation.replace(/`/g, '\\`')}\`,${tagsStr}${sourceStr}
  }`;
}

// Integra questões ao arquivo TypeScript
function integrateQuestions(targetFile, questions, startId) {
  if (questions.length === 0) {
    console.log('⚠️  Nenhuma questão para integrar.');
    return false;
  }

  let content = fs.readFileSync(targetFile, 'utf8');
  
  // Encontra a posição do fechamento do array (último ];)
  const insertPosition = content.lastIndexOf('];');
  
  if (insertPosition === -1) {
    console.error('❌ Não foi possível encontrar o final do array de questões.');
    return false;
  }

  // Verifica se precisa adicionar vírgula antes da inserção
  const beforeInsert = content.substring(0, insertPosition).trimEnd();
  const needsComma = !beforeInsert.endsWith(',');

  // Atualiza IDs das questões
  const updatedQuestions = questions.map((q, idx) => ({
    ...q,
    id: startId + idx + 1
  }));

  // Formata questões
  const formattedQuestions = updatedQuestions.map(formatQuestionTS).join(',\n');
  
  // Monta o bloco de inserção
  const timestamp = new Date().toISOString().split('T')[0];
  const commaPrefix = needsComma ? ',' : '';
  const insertion = `${commaPrefix}

  // ================================================================
  // QUESTÕES INTEGRADAS - ${timestamp}
  // Total: ${questions.length} questões
  // ================================================================
${formattedQuestions},
`;

  // Insere as questões
  const before = content.substring(0, insertPosition);
  const after = content.substring(insertPosition);
  
  const newContent = before + insertion + after;
  
  // Salva o arquivo
  fs.writeFileSync(targetFile, newContent, 'utf8');
  
  console.log(`✅ ${questions.length} questões integradas com sucesso!`);
  console.log(`   IDs: ${startId + 1} até ${startId + questions.length}`);
  
  return true;
}

// Main
function main() {
  const args = process.argv.slice(2);
  const cargo = args[0];
  const data = args[1];

  console.log('\n' + '='.repeat(60));
  console.log('🔄 INTEGRAÇÃO DE QUESTÕES AO QUESTIONÁRIO');
  console.log('='.repeat(60));

  if (!cargo || !['analista', 'tecnico'].includes(cargo)) {
    console.log(`
Uso: node scripts/integrate-questions.js <cargo> [data]

Parâmetros:
  cargo  - "analista" ou "tecnico"
  data   - Data do arquivo (opcional, formato: YYYY-MM-DD)

Exemplos:
  node scripts/integrate-questions.js analista
  node scripts/integrate-questions.js tecnico 2026-01-13
`);
    process.exit(1);
  }

  // Define arquivo de destino
  const targetFile = cargo === 'analista' ? 
    PATHS.questionsAnalista : PATHS.questionsTecnico;

  console.log(`\n📋 Cargo: ${cargo}`);
  console.log(`📁 Destino: ${path.basename(targetFile)}`);

  // Encontra arquivo de questões
  const sourceFile = findGeneratedFile(cargo, data);
  
  if (!sourceFile) {
    console.log(`\n❌ Nenhum arquivo de questões encontrado para "${cargo}".`);
    console.log('   Execute primeiro: node scripts/generate-questions-cli.js');
    process.exit(1);
  }

  console.log(`📄 Origem: ${path.basename(sourceFile)}`);

  // Carrega questões
  const questions = loadQuestions(sourceFile);
  console.log(`📊 Questões encontradas: ${questions.length}`);

  if (questions.length === 0) {
    console.log('\n⚠️  Arquivo vazio ou inválido.');
    process.exit(1);
  }

  // Encontra o maior ID atual
  const maxId = findMaxId(targetFile);
  console.log(`🔢 Maior ID atual: ${maxId}`);

  // Integra questões
  const success = integrateQuestions(targetFile, questions, maxId);

  if (success) {
    console.log('\n' + '='.repeat(60));
    console.log('✨ INTEGRAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('='.repeat(60));
    console.log(`
Próximos passos:
  1. Verifique as questões em: src/data/${path.basename(targetFile)}
  2. Execute o build: npm run build
  3. Deploy para VM: scp -r dist lfragoso@192.168.0.45:/home/lfragoso/
`);
  }
}

main();
