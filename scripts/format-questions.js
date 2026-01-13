/**
 * Script para analisar e formatar questões que precisam de quebras de linha
 * Identifica: Associação de colunas, Avaliação de itens (I, II, III), V/F
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
  analista: path.join(__dirname, '..', 'src', 'data', 'questions.ts'),
  tecnico: path.join(__dirname, '..', 'src', 'data', 'questionsTecnico.ts'),
};

// Padrões que indicam necessidade de formatação
const PATTERNS = {
  // Associação de colunas
  colunas: [
    /Associe.*coluna/i,
    /Primeira coluna.*Segunda coluna/i,
    /Coluna\s*1.*Coluna\s*2/i,
    /1\.\s*\w+.*2\.\s*\w+.*3\.\s*\w+/,
    /\(\s*__\s*\)/,
  ],
  // Avaliação de itens
  itens: [
    /\bI\s*[-–—\.]\s*[A-Z]/,
    /\bII\s*[-–—\.]\s*[A-Z]/,
    /\bIII\s*[-–—\.]\s*[A-Z]/,
    /avalie.*afirmativas/i,
    /julgue.*itens/i,
    /analise.*assertivas/i,
  ],
  // Verdadeiro/Falso
  vf: [
    /\(\s*[_\s]*\)\s*[A-Z]/,
    /Julgue.*V.*F/i,
    /verdadeiro.*falso/i,
    /sequência.*correta/i,
  ],
};

// Função para formatar texto de questão
function formatQuestionText(text) {
  let formatted = text;
  
  // 1. Formatar itens I, II, III, IV, V
  // Padrão: "I. texto" ou "I - texto" ou "I– texto"
  formatted = formatted.replace(/([;:.])\s*(I\s*[-–—\.]\s*)/g, '$1\n$2');
  formatted = formatted.replace(/([;:.])\s*(II\s*[-–—\.]\s*)/g, '$1\n$2');
  formatted = formatted.replace(/([;:.])\s*(III\s*[-–—\.]\s*)/g, '$1\n$2');
  formatted = formatted.replace(/([;:.])\s*(IV\s*[-–—\.]\s*)/g, '$1\n$2');
  formatted = formatted.replace(/([;:.])\s*(V\s*[-–—\.]\s*)/g, '$1\n$2');
  
  // Também capturar quando não tem pontuação antes
  formatted = formatted.replace(/\s+(I\s*[-–—\.]\s+[A-Z])/g, '\n$1');
  formatted = formatted.replace(/\s+(II\s*[-–—\.]\s+[A-Z])/g, '\n$1');
  formatted = formatted.replace(/\s+(III\s*[-–—\.]\s+[A-Z])/g, '\n$1');
  formatted = formatted.replace(/\s+(IV\s*[-–—\.]\s+[A-Z])/g, '\n$1');
  formatted = formatted.replace(/\s+(V\s*[-–—\.]\s+[A-Z])/g, '\n$1');
  
  // 2. Formatar associação de colunas
  // Padrão: "Primeira coluna:" ou "1ª coluna:" ou "Coluna 1:"
  formatted = formatted.replace(/(Primeira coluna:?)/gi, '\n\n$1');
  formatted = formatted.replace(/(Segunda coluna:?)/gi, '\n\n$1');
  formatted = formatted.replace(/(1ª coluna:?)/gi, '\n\n$1');
  formatted = formatted.replace(/(2ª coluna:?)/gi, '\n\n$1');
  formatted = formatted.replace(/(Coluna 1:?)/gi, '\n\n$1');
  formatted = formatted.replace(/(Coluna 2:?)/gi, '\n\n$1');
  
  // Formatar itens numerados em colunas: "1. termo" "2. termo"
  formatted = formatted.replace(/([;:])\s*(1\.\s*\w+)/g, '$1\n$2');
  formatted = formatted.replace(/([;])\s*(2\.\s*\w+)/g, '$1\n$2');
  formatted = formatted.replace(/([;])\s*(3\.\s*\w+)/g, '$1\n$2');
  formatted = formatted.replace(/([;])\s*(4\.\s*\w+)/g, '$1\n$2');
  
  // Formatar letras em colunas: "A. definição" "B. definição"
  formatted = formatted.replace(/([;])\s*(A\.\s*\w+)/g, '$1\n$2');
  formatted = formatted.replace(/([;])\s*(B\.\s*\w+)/g, '$1\n$2');
  formatted = formatted.replace(/([;])\s*(C\.\s*\w+)/g, '$1\n$2');
  formatted = formatted.replace(/([;])\s*(D\.\s*\w+)/g, '$1\n$2');
  
  // 3. Formatar V/F com parênteses
  // Padrão: "(__) afirmativa"
  formatted = formatted.replace(/([.:;])\s*\(\s*[_\s]*\)/g, '$1\n(__)');
  
  // 4. Formatar "Está correto" ou "A sequência correta é"
  formatted = formatted.replace(/([.:;])\s*(Está\s*\(?ão\)?\s*corret)/gi, '$1\n\n$2');
  formatted = formatted.replace(/([.:;])\s*(A sequência correta)/gi, '$1\n\n$2');
  formatted = formatted.replace(/([.:;])\s*(Estão corretas)/gi, '$1\n\n$2');
  formatted = formatted.replace(/([.:;])\s*(É correto o que)/gi, '$1\n\n$2');
  
  // 5. Limpar múltiplas quebras de linha
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  formatted = formatted.trim();
  
  return formatted;
}

// Verifica se questão precisa de formatação
function needsFormatting(text) {
  for (const patterns of Object.values(PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        return true;
      }
    }
  }
  return false;
}

// Extrai questões do arquivo TypeScript
function extractQuestions(content) {
  const questions = [];
  const regex = /{\s*id:\s*(\d+),\s*subject:\s*'([^']+)',\s*subjectName:\s*'([^']+)',\s*weight:\s*(\d+),\s*text:\s*`([^`]+)`/g;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    questions.push({
      id: parseInt(match[1]),
      subject: match[2],
      subjectName: match[3],
      weight: parseInt(match[4]),
      text: match[5],
      startIndex: match.index,
      fullMatch: match[0],
    });
  }
  
  return questions;
}

// Processa arquivo
function processFile(filePath, cargo) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Processando: ${cargo.toUpperCase()}`);
  console.log(`${'═'.repeat(60)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const questions = extractQuestions(content);
  
  console.log(`📊 Total de questões: ${questions.length}`);
  
  let formattedCount = 0;
  const changes = [];
  
  for (const q of questions) {
    if (needsFormatting(q.text)) {
      const formatted = formatQuestionText(q.text);
      
      if (formatted !== q.text) {
        formattedCount++;
        changes.push({
          id: q.id,
          original: q.text,
          formatted: formatted,
        });
        
        // Substituir no conteúdo
        const oldText = `text: \`${q.text}\``;
        const newText = `text: \`${formatted}\``;
        content = content.replace(oldText, newText);
        
        console.log(`   ✅ Q${q.id}: Formatada`);
      }
    }
  }
  
  if (formattedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`\n💾 ${formattedCount} questões formatadas e salvas`);
  } else {
    console.log(`\n✓ Nenhuma questão precisou de formatação`);
  }
  
  return { total: questions.length, formatted: formattedCount, changes };
}

// Main
function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('     FORMATADOR DE QUESTÕES - PRODERJ');
  console.log('     Adiciona quebras de linha para melhor exibição');
  console.log('═══════════════════════════════════════════════════════════');
  
  const results = {
    analista: processFile(PATHS.analista, 'analista'),
    tecnico: processFile(PATHS.tecnico, 'tecnico'),
  };
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('                    RESUMO');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Analista: ${results.analista.formatted}/${results.analista.total} formatadas`);
  console.log(`Técnico: ${results.tecnico.formatted}/${results.tecnico.total} formatadas`);
  console.log('\n✨ Concluído! Execute "npm run build" para compilar.');
}

main();
