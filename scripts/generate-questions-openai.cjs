#!/usr/bin/env node

/**
 * Script CLI para Geração de Questões via OpenAI - PRODERJ 2026
 * 
 * Uso: node scripts/generate-questions-openai.cjs
 * 
 * Gera questões AUTOMATICAMENTE usando a API da OpenAI, escolhendo:
 * - Cargo (Analista ou Técnico)
 * - Matéria
 * - Nível de Dificuldade (baixo, medio, alto)
 * 
 * Configuração: Crie um arquivo .env na raiz do projeto com:
 * OPENAI_API_KEY=sk-sua-chave-aqui
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Carregar variáveis do arquivo .env
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
    return true;
  }
  return false;
}

// Carregar .env
const envLoaded = loadEnv();

// Verificar API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY || OPENAI_API_KEY === 'sk-sua-chave-aqui') {
  console.error('\n❌ ERRO: OPENAI_API_KEY não configurada!');
  console.log('\n📌 Configure no arquivo .env na raiz do projeto:');
  console.log('   OPENAI_API_KEY=sk-sua-chave-real-aqui');
  console.log('\n   O arquivo .env já foi criado, basta editar com sua chave.');
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

// Subtópicos detalhados por matéria
const SUBTOPICS = {
  portugues: [
    'Interpretação de texto e inferências',
    'Gramática: concordância verbal e nominal',
    'Regência verbal e nominal, crase',
    'Pontuação e ortografia oficial',
    'Coesão e coerência textual',
    'Classes de palavras e funções sintáticas',
    'Semântica: sinônimos, antônimos, homônimos, parônimos'
  ],
  logica: [
    'Proposições e conectivos lógicos',
    'Tabela-verdade e equivalências lógicas',
    'Negação de proposições compostas',
    'Argumentação e validade de argumentos',
    'Diagramas lógicos e conjuntos',
    'Sequências e padrões numéricos',
    'Raciocínio analítico e problemas'
  ],
  direito: [
    'Princípios da Administração Pública (LIMPE)',
    'Atos administrativos: elementos, atributos, extinção',
    'Licitações e contratos administrativos',
    'Servidores públicos: regime jurídico',
    'Responsabilidade civil do Estado',
    'Lei de Acesso à Informação (LAI)',
    'LGPD na Administração Pública',
    'Improbidade administrativa'
  ],
  especificos_analista: [
    'UML 2.x: diagramas de casos de uso, classes, sequência, atividades',
    'BPMN 2.0: eventos, gateways, atividades, pools, lanes',
    'Padrões de projeto GoF: criacionais, estruturais, comportamentais',
    'Arquitetura de software: MVC, microsserviços, SOA, clean architecture',
    'DevOps e CI/CD: Docker, Kubernetes, pipelines',
    'Banco de dados: SQL avançado, normalização, índices, transações',
    'NoSQL: MongoDB, Redis, conceitos CAP',
    'Segurança: OWASP, criptografia, autenticação OAuth/JWT',
    'Cloud computing: IaaS, PaaS, SaaS, modelos de implantação',
    'Metodologias ágeis: Scrum, Kanban, XP',
    'Testes de software: TDD, BDD, tipos de testes',
    'ITIL e governança de TI'
  ],
  especificos_tecnico: [
    'Windows Server: Active Directory, GPOs, DHCP, DNS',
    'Linux: gerenciamento de pacotes, permissões, serviços systemd',
    'Redes: VLANs, roteamento, switches, Wi-Fi',
    'Hardware: arquitetura, RAID, diagnóstico de falhas',
    'Virtualização: Hyper-V, VMware, VirtualBox',
    'Backup: completo, incremental, diferencial, estratégia 3-2-1',
    'Segurança: firewall, antivírus, VPN, criptografia',
    'Cabeamento estruturado: Cat5e, Cat6, fibra óptica',
    'Suporte ao usuário: Help Desk, ITIL, SLA',
    'Pacote Office e LibreOffice',
    'Manutenção preventiva e corretiva de equipamentos'
  ]
};

const DIFFICULTIES = {
  baixo: 'Questões diretas e conceituais, cobrando definições e conceitos básicos',
  medio: 'Questões com análise, exceções e aplicação de conhecimento',
  alto: 'Questões com cenários complexos, casos práticos e raciocínio avançado'
};

// Função para chamar a API da OpenAI
async function callOpenAI(prompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em elaboração de questões para concursos públicos brasileiros, especialmente para a banca IBDO Projetos. Gere questões técnicas de alto nível, realistas e bem elaboradas.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = require('https').request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (parsed.error) {
            reject(new Error(parsed.error.message));
          } else {
            resolve(parsed.choices[0].message.content);
          }
        } catch (e) {
          reject(new Error(`Erro ao parsear resposta: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Erro na requisição: ${e.message}`));
    });

    req.write(data);
    req.end();
  });
}

// Função para construir o prompt
function buildPrompt(cargo, materia, subtopics, dificuldade, quantidade) {
  const cargoNome = cargo === 'analista' ? 
    'Analista de Sistemas e Métodos' : 
    'Técnico de Suporte, Computação e Processamento';
  
  const escolaridade = cargo === 'analista' ? 
    'Nível Superior em TI' : 
    'Nível Médio/Técnico';

  return `Você é um especialista em elaboração de questões para concursos públicos brasileiros.

CONTEXTO DO CONCURSO:
- Órgão: PRODERJ - Centro de Tecnologia da Informação e Comunicação do Estado do Rio de Janeiro
- Banca Organizadora: Instituto IBDO Projetos
- Cargo: ${cargoNome}
- Escolaridade: ${escolaridade}
- Matéria: ${materia}

TEMAS A COBRIR:
${subtopics.map(t => `- ${t}`).join('\n')}

NÍVEL DE DIFICULDADE: ${dificuldade.toUpperCase()}
${DIFFICULTIES[dificuldade]}

CARACTERÍSTICAS DA BANCA IBDO:
1. Questões objetivas com 4 alternativas (A, B, C, D)
2. Enunciados DIRETOS e CLAROS
3. Linguagem técnica precisa
4. Distratores plausíveis e bem elaborados
5. Cobrança de conhecimento APLICADO e PRÁTICO
6. Pode incluir cenários ou situações-problema

INSTRUÇÕES:
- Gere EXATAMENTE ${quantidade} questões
- Cada questão deve ser ÚNICA e ORIGINAL
- Inclua explicação técnica detalhada do gabarito
- As alternativas incorretas devem ser plausíveis mas claramente erradas

FORMATO DE SAÍDA (JSON válido):
[
  {
    "text": "Enunciado completo da questão",
    "options": [
      { "letter": "A", "text": "Alternativa A" },
      { "letter": "B", "text": "Alternativa B" },
      { "letter": "C", "text": "Alternativa C" },
      { "letter": "D", "text": "Alternativa D" }
    ],
    "correctAnswer": "B",
    "explanation": "Explicação detalhada"
  }
]

Retorne APENAS o JSON, sem texto adicional ou markdown.`;
}

// Função para parsear resposta JSON
function parseQuestions(jsonString) {
  let cleaned = jsonString.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  return JSON.parse(cleaned.trim());
}

// Classe principal do gerador
class QuestionGenerator {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
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
      console.log(`  ${idx + 1}. ${typeof opt === 'object' ? opt.name || opt.id : opt}`);
    });
    
    const answer = await this.prompt('\nEscolha (número): ');
    const index = parseInt(answer) - 1;
    
    if (index >= 0 && index < options.length) {
      return options[index];
    }
    
    console.log('⚠️  Opção inválida. Tente novamente.');
    return this.selectFromList(message, options);
  }

  findMaxId(cargo) {
    const config = CONFIG[cargo];
    const filePath = path.join(__dirname, '..', 'src', 'data', config.file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const idMatches = content.match(/id:\s*(\d+)/g);
      if (idMatches) {
        const ids = idMatches.map(m => parseInt(m.replace('id:', '').trim()));
        return Math.max(...ids);
      }
    } catch (e) {}
    return cargo === 'analista' ? 200 : 2000;
  }

  async saveQuestions(cargo, questions, subject, difficulty) {
    const timestamp = new Date().toISOString().split('T')[0];
    const outputDir = path.join(__dirname, '..', 'generated');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `questoes-${cargo}-${timestamp}`;
    const jsonFile = path.join(outputDir, `${filename}.json`);
    
    fs.writeFileSync(jsonFile, JSON.stringify(questions, null, 2), 'utf-8');

    console.log(`\n✅ Questões salvas em: ${jsonFile}`);
    return jsonFile;
  }

  async run() {
    console.log('\n' + '═'.repeat(60));
    console.log('🤖 GERADOR DE QUESTÕES VIA OPENAI - PRODERJ 2026');
    console.log('═'.repeat(60));
    console.log('✅ API Key detectada');

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
        { id: 'baixo', name: 'Baixo - Questões diretas e conceituais' },
        { id: 'medio', name: 'Médio - Questões com análise e aplicação' },
        { id: 'alto', name: 'Alto - Questões práticas e cenários complexos' }
      ]
    );

    // 4. Quantidade de questões
    const quantityInput = await this.prompt('\n🔢 Quantas questões deseja gerar? (1-20, padrão: 5): ');
    const quantity = Math.min(20, Math.max(1, parseInt(quantityInput) || 5));

    // 5. Obter subtópicos da matéria
    const subtopics = SUBTOPICS[subject.id] || ['Conteúdo geral da matéria'];

    // 6. Gerar questões via OpenAI
    console.log('\n⏳ Gerando questões via OpenAI API...');
    console.log(`   Cargo: ${cargo.name}`);
    console.log(`   Matéria: ${subject.name}`);
    console.log(`   Dificuldade: ${difficulty.id}`);
    console.log(`   Quantidade: ${quantity}`);
    console.log('\n   Aguarde, isso pode levar alguns segundos...\n');

    try {
      const prompt = buildPrompt(cargo.id, subject.name, subtopics, difficulty.id, quantity);
      const response = await callOpenAI(prompt);
      const rawQuestions = parseQuestions(response);

      // Adicionar metadados às questões
      let currentId = this.findMaxId(cargo.id) + 1;
      const questions = rawQuestions.map((q, idx) => ({
        id: currentId + idx,
        subject: subject.id,
        subjectName: subject.name,
        subtopic: subtopics[idx % subtopics.length],
        difficulty: difficulty.id,
        weight: subject.weight,
        ...q,
        tags: [subject.id, difficulty.id],
        source: 'OpenAI-GPT4'
      }));

      console.log(`✅ ${questions.length} questões geradas com sucesso!\n`);
      
      // Mostrar preview
      console.log('📝 Preview da primeira questão:');
      console.log('─'.repeat(50));
      console.log(`ID: ${questions[0].id}`);
      console.log(`Texto: ${questions[0].text.substring(0, 100)}...`);
      console.log(`Resposta: ${questions[0].correctAnswer}`);
      console.log('─'.repeat(50));

      // Salvar questões
      const jsonFile = await this.saveQuestions(cargo.id, questions, subject, difficulty);

      // Instruções finais
      console.log('\n' + '═'.repeat(60));
      console.log('📋 PRÓXIMOS PASSOS:');
      console.log('═'.repeat(60));
      console.log(`
1. Revise as questões geradas em:
   ${jsonFile}

2. Para integrar ao questionário, execute:
   node scripts/integrate-questions.cjs ${cargo.id}

3. Após integrar, faça o build:
   npm run build

4. Deploy para a VM:
   scp -r dist lfragoso@192.168.0.45:/home/lfragoso/
`);

    } catch (error) {
      console.error(`\n❌ Erro ao gerar questões: ${error.message}`);
      if (error.message.includes('API')) {
        console.log('\n💡 Verifique se sua OPENAI_API_KEY está correta e tem créditos.');
      }
    }

    this.rl.close();
  }
}

// Execução
const generator = new QuestionGenerator();
generator.run().catch(console.error);
