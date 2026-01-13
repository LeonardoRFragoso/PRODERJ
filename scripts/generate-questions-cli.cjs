#!/usr/bin/env node

/**
 * Script CLI para Geração de Questões via OpenAI - PRODERJ 2026
 * 
 * Uso: node scripts/generate-questions-cli.cjs
 * 
 * Permite gerar novas questões usando IA escolhendo:
 * - Cargo (Analista ou Técnico)
 * - Matéria
 * - Nível de Dificuldade (baixo, medio, alto)
 * 
 * Requer: OPENAI_API_KEY definida como variável de ambiente
 * PowerShell: $env:OPENAI_API_KEY="sk-..."
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');

// Verificar API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('\n❌ ERRO: Variável OPENAI_API_KEY não definida!');
  console.log('\nPara definir no PowerShell:');
  console.log('  $env:OPENAI_API_KEY="sk-sua-chave-aqui"');
  console.log('\nPara definir no CMD:');
  console.log('  set OPENAI_API_KEY=sk-sua-chave-aqui');
  process.exit(1);
}

// Configuração de cargos e matérias
const CONFIG = {
  analista: {
    file: 'questions.ts',
    subjects: [
      { id: 'portugues', name: 'Língua Portuguesa', weight: 2 },
      { id: 'logica', name: 'Raciocínio Lógico-Matemático', weight: 2 },
      { id: 'direito', name: 'Direito Administrativo e Constitucional', weight: 2 },
      { id: 'especificos_analista', name: 'Conhecimentos Específicos - Analista', weight: 3 }
    ]
  },
  tecnico: {
    file: 'questionsTecnico.ts',
    subjects: [
      { id: 'portugues', name: 'Língua Portuguesa', weight: 2 },
      { id: 'logica', name: 'Raciocínio Lógico-Matemático', weight: 2 },
      { id: 'direito', name: 'Direito Administrativo e Constitucional', weight: 2 },
      { id: 'especificos_tecnico', name: 'Conhecimentos Específicos - Técnico', weight: 3 }
    ]
  }
};

const DIFFICULTIES = ['baixo', 'medio', 'alto'];

// Subtópicos por matéria
const SUBTOPICS = {
  portugues: [
    'Interpretação de Texto', 'Gramática', 'Ortografia', 'Acentuação Gráfica',
    'Concordância Verbal', 'Concordância Nominal', 'Regência', 'Crase',
    'Pontuação', 'Classes de Palavras', 'Semântica', 'Coesão e Coerência'
  ],
  logica: [
    'Proposições', 'Conectivos Lógicos', 'Tabela-Verdade', 'Equivalências',
    'Negação de Proposições', 'Argumentação', 'Sequências', 'Conjuntos',
    'Probabilidade', 'Análise Combinatória', 'Raciocínio Analítico'
  ],
  direito: [
    'Princípios da Administração Pública', 'Atos Administrativos', 'Licitações',
    'Contratos Administrativos', 'Servidores Públicos', 'Responsabilidade Civil',
    'Direitos Fundamentais', 'Organização do Estado', 'Improbidade Administrativa',
    'Lei de Acesso à Informação', 'LGPD'
  ],
  especificos_analista: [
    'Arquitetura de Software', 'Padrões de Projeto', 'UML', 'BPMN',
    'Banco de Dados', 'SQL', 'Cloud Computing', 'DevOps', 'Segurança da Informação',
    'Redes de Computadores', 'Metodologias Ágeis', 'ITIL', 'Governança de TI',
    'Desenvolvimento Web', 'APIs REST', 'Microsserviços', 'Testes de Software'
  ],
  especificos_tecnico: [
    'Windows Server', 'Active Directory', 'Redes', 'Hardware',
    'Manutenção de Computadores', 'Suporte ao Usuário', 'Impressoras',
    'Cabeamento Estruturado', 'Virtualização', 'Backup', 'Segurança',
    'Pacote Office', 'LibreOffice', 'Help Desk', 'ITIL'
  ]
};

// Templates de questões por dificuldade
const QUESTION_TEMPLATES = {
  baixo: [
    'Sobre {topic}, assinale a alternativa CORRETA:',
    'Qual das alternativas representa corretamente {topic}?',
    'Em relação a {topic}, é CORRETO afirmar que:',
    'Assinale a alternativa que define CORRETAMENTE {topic}:'
  ],
  medio: [
    'Sobre {topic}, assinale a alternativa INCORRETA:',
    'Todas as alternativas sobre {topic} estão corretas, EXCETO:',
    'Analise as afirmativas sobre {topic} e assinale a alternativa correta:',
    'Considerando {topic}, qual alternativa apresenta informação FALSA?'
  ],
  alto: [
    'Analise o cenário: {scenario}. Sobre {topic}, qual a MELHOR solução?',
    'Em uma situação onde {scenario}, qual abordagem de {topic} é mais adequada?',
    'Considerando as melhores práticas de {topic} e o cenário {scenario}, assinale a alternativa correta:',
    '[Caso prático] {scenario}. Aplicando conceitos de {topic}, qual alternativa está INCORRETA?'
  ]
};

class QuestionGenerator {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.generatedQuestions = [];
  }

  async prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async selectFromList(message, options) {
    console.log(`\n${message}`);
    options.forEach((opt, idx) => {
      console.log(`  ${idx + 1}. ${typeof opt === 'object' ? opt.name : opt}`);
    });
    
    const answer = await this.prompt('\nEscolha (número): ');
    const index = parseInt(answer) - 1;
    
    if (index >= 0 && index < options.length) {
      return options[index];
    }
    
    console.log('⚠️  Opção inválida. Tente novamente.');
    return this.selectFromList(message, options);
  }

  generateQuestionId(cargo) {
    const config = CONFIG[cargo];
    const filePath = path.join(__dirname, '..', 'src', 'data', config.file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Encontra o maior ID existente
    const idMatches = content.match(/id:\s*(\d+)/g);
    if (idMatches) {
      const ids = idMatches.map(m => parseInt(m.replace('id:', '').trim()));
      return Math.max(...ids) + 1;
    }
    return cargo === 'analista' ? 200 : 2000;
  }

  createQuestionTemplate(subject, subtopic, difficulty, questionId) {
    const templates = QUESTION_TEMPLATES[difficulty];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      id: questionId,
      subject: subject.id,
      subjectName: subject.name,
      subtopic: subtopic,
      difficulty: difficulty,
      weight: subject.weight,
      text: template.replace('{topic}', subtopic).replace('{scenario}', '[DESCREVA O CENÁRIO]'),
      options: [
        { letter: 'A', text: '[ALTERNATIVA A - CORRETA se dificuldade baixo]' },
        { letter: 'B', text: '[ALTERNATIVA B]' },
        { letter: 'C', text: '[ALTERNATIVA C]' },
        { letter: 'D', text: '[ALTERNATIVA D]' }
      ],
      correctAnswer: 'A',
      explanation: '[EXPLICAÇÃO DA RESPOSTA CORRETA]',
      tags: [subtopic.toLowerCase().replace(/ /g, '_')],
      source: 'gerado_script'
    };
  }

  formatQuestionForTS(question) {
    return `  {
    id: ${question.id},
    subject: '${question.subject}',
    subjectName: '${question.subjectName}',
    subtopic: '${question.subtopic}',
    difficulty: '${question.difficulty}',
    weight: ${question.weight},
    text: \`${question.text}\`,
    options: [
      { letter: 'A', text: \`${question.options[0].text}\` },
      { letter: 'B', text: \`${question.options[1].text}\` },
      { letter: 'C', text: \`${question.options[2].text}\` },
      { letter: 'D', text: \`${question.options[3].text}\` }
    ],
    correctAnswer: '${question.correctAnswer}',
    explanation: \`${question.explanation}\`,
    tags: [${question.tags.map(t => `'${t}'`).join(', ')}],
    source: '${question.source}',
  },`;
  }

  async saveQuestions(cargo, questions) {
    const timestamp = new Date().toISOString().split('T')[0];
    const outputDir = path.join(__dirname, '..', 'generated');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Salva em JSON para edição
    const jsonFile = path.join(outputDir, `questoes-${cargo}-${timestamp}.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(questions, null, 2), 'utf-8');

    // Salva em formato TS para integração
    const tsFile = path.join(outputDir, `questoes-${cargo}-${timestamp}.ts`);
    const tsContent = `// Questões geradas em ${timestamp}
// Cargo: ${cargo}
// Total: ${questions.length} questões
// 
// INSTRUÇÕES:
// 1. Edite as questões abaixo conforme necessário
// 2. Execute: node scripts/integrate-questions.js ${cargo} ${timestamp}
// 
// ============================================================

export const newQuestions = [
${questions.map(q => this.formatQuestionForTS(q)).join('\n')}
];
`;
    fs.writeFileSync(tsFile, tsContent, 'utf-8');

    console.log(`\n✅ Questões salvas em:`);
    console.log(`   📄 JSON: ${jsonFile}`);
    console.log(`   📄 TS:   ${tsFile}`);
    
    return { jsonFile, tsFile, timestamp };
  }

  async run() {
    console.log('\n' + '='.repeat(60));
    console.log('🎓 GERADOR DE QUESTÕES - PRODERJ 2026');
    console.log('='.repeat(60));

    // 1. Selecionar cargo
    const cargo = await this.selectFromList(
      '📋 Selecione o CARGO:',
      [
        { id: 'analista', name: 'Analista de Sistemas e Métodos' },
        { id: 'tecnico', name: 'Técnico de Informática' }
      ]
    );

    // 2. Selecionar matéria
    const subject = await this.selectFromList(
      '📚 Selecione a MATÉRIA:',
      CONFIG[cargo.id].subjects
    );

    // 3. Selecionar dificuldade
    const difficulty = await this.selectFromList(
      '📊 Selecione o NÍVEL DE DIFICULDADE:',
      [
        { id: 'baixo', name: 'Baixo (questões diretas e conceituais)' },
        { id: 'medio', name: 'Médio (questões com análise e exceções)' },
        { id: 'alto', name: 'Alto (questões práticas e cenários complexos)' }
      ]
    );

    // 4. Selecionar subtópicos
    const availableSubtopics = SUBTOPICS[subject.id] || ['Geral'];
    console.log('\n📑 Subtópicos disponíveis:');
    availableSubtopics.forEach((st, idx) => console.log(`   ${idx + 1}. ${st}`));
    
    const subtopicInput = await this.prompt('\nEscolha os subtópicos (números separados por vírgula, ou "todos"): ');
    
    let selectedSubtopics;
    if (subtopicInput.toLowerCase() === 'todos') {
      selectedSubtopics = availableSubtopics;
    } else {
      const indices = subtopicInput.split(',').map(s => parseInt(s.trim()) - 1);
      selectedSubtopics = indices
        .filter(i => i >= 0 && i < availableSubtopics.length)
        .map(i => availableSubtopics[i]);
    }

    if (selectedSubtopics.length === 0) {
      console.log('⚠️  Nenhum subtópico válido selecionado. Usando todos.');
      selectedSubtopics = availableSubtopics;
    }

    // 5. Quantidade de questões
    const quantityInput = await this.prompt('\n🔢 Quantas questões deseja gerar por subtópico? (padrão: 2): ');
    const quantity = parseInt(quantityInput) || 2;

    // 6. Gerar questões
    console.log('\n⏳ Gerando questões...\n');
    
    let currentId = this.generateQuestionId(cargo.id);
    const questions = [];

    for (const subtopic of selectedSubtopics) {
      for (let i = 0; i < quantity; i++) {
        const question = this.createQuestionTemplate(subject, subtopic, difficulty.id, currentId);
        questions.push(question);
        console.log(`   ✓ Questão ${currentId}: ${subtopic} (${difficulty.id})`);
        currentId++;
      }
    }

    // 7. Salvar questões
    const { jsonFile, tsFile, timestamp } = await this.saveQuestions(cargo.id, questions);

    // 8. Instruções finais
    console.log('\n' + '='.repeat(60));
    console.log('📝 PRÓXIMOS PASSOS:');
    console.log('='.repeat(60));
    console.log(`
1. Edite o arquivo TS gerado com o conteúdo real das questões:
   ${tsFile}

2. Após editar, integre as questões ao questionário:
   node scripts/integrate-questions.js ${cargo.id} ${timestamp}

3. Faça o build e deploy:
   npm run build
   scp -r dist lfragoso@192.168.0.45:/home/lfragoso/
`);

    this.rl.close();
    return questions;
  }
}

// Execução
const generator = new QuestionGenerator();
generator.run().catch(console.error);
