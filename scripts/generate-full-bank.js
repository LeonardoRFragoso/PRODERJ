/**
 * Gerador completo do banco de questões via OpenAI
 * Gera 180 questões por cargo seguindo a estrutura real da prova PRODERJ
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Estrutura da prova: 60 questões x 3 = 180 questões por cargo
const ESTRUTURA_PROVA = {
  analista: {
    materias: [
      {
        id: 'portugues',
        name: 'Língua Portuguesa',
        quantidade: 30, // 10 x 3 provas
        weight: 2,
        temas: [
          'Interpretação e compreensão de texto',
          'Tipologia e gêneros textuais',
          'Ortografia oficial',
          'Acentuação gráfica',
          'Emprego das classes de palavras',
          'Sintaxe da oração e do período',
          'Pontuação',
          'Concordância nominal e verbal',
          'Regência nominal e verbal',
          'Crase',
          'Colocação pronominal',
          'Significação das palavras: sinônimos, antônimos, parônimos, homônimos'
        ]
      },
      {
        id: 'logica',
        name: 'Raciocínio Lógico-Matemático',
        quantidade: 30,
        weight: 2,
        temas: [
          'Proposições, conectivos e tabelas-verdade',
          'Equivalências e negações lógicas',
          'Argumentação e validade de argumentos',
          'Diagramas lógicos',
          'Sequências e padrões numéricos',
          'Análise combinatória básica',
          'Probabilidade',
          'Raciocínio analítico e crítico',
          'Problemas de lógica',
          'Conjuntos e operações'
        ]
      },
      {
        id: 'direito',
        name: 'Direito Administrativo e Constitucional',
        quantidade: 30,
        weight: 2,
        temas: [
          'Princípios fundamentais da Constituição Federal',
          'Direitos e garantias fundamentais',
          'Organização do Estado brasileiro',
          'Administração Pública direta e indireta',
          'Princípios da Administração Pública (LIMPE)',
          'Atos administrativos',
          'Licitações e contratos (Lei 14.133/2021)',
          'Servidores públicos',
          'Responsabilidade civil do Estado',
          'Controle da Administração Pública',
          'Improbidade administrativa (Lei 8.429/92)',
          'Lei de Acesso à Informação (Lei 12.527/2011)'
        ]
      },
      {
        id: 'especificos_analista',
        name: 'Conhecimentos Específicos - Analista',
        quantidade: 90, // 30 x 3 provas
        weight: 3,
        temas: [
          'Engenharia de Software: ciclo de vida, metodologias ágeis (Scrum, Kanban, XP)',
          'UML 2.5: diagramas de classe, sequência, casos de uso, atividades, estados',
          'Padrões de projeto (GoF): criacionais, estruturais, comportamentais',
          'Arquitetura de software: MVC, microsserviços, SOA, REST, API',
          'DevOps: CI/CD, Docker, Kubernetes, Git',
          'Banco de dados: modelagem relacional, normalização, SQL avançado',
          'Banco de dados NoSQL: MongoDB, Redis, conceitos',
          'Segurança da informação: criptografia, certificados digitais, LGPD',
          'Redes de computadores: TCP/IP, protocolos, segurança de redes',
          'Cloud computing: conceitos, IaaS, PaaS, SaaS, AWS, Azure',
          'Gestão de projetos: PMBOK, metodologias ágeis',
          'BPMN 2.0: modelagem de processos de negócio',
          'Testes de software: unitários, integração, sistema, TDD, BDD',
          'Linguagens de programação: Java, Python, JavaScript (conceitos)',
          'ITIL 4: gerenciamento de serviços de TI'
        ]
      }
    ]
  },
  tecnico: {
    materias: [
      {
        id: 'portugues',
        name: 'Língua Portuguesa',
        quantidade: 30,
        weight: 2,
        temas: [
          'Interpretação e compreensão de texto',
          'Tipologia e gêneros textuais',
          'Ortografia oficial',
          'Acentuação gráfica',
          'Emprego das classes de palavras',
          'Sintaxe da oração e do período',
          'Pontuação',
          'Concordância nominal e verbal',
          'Regência nominal e verbal',
          'Crase',
          'Colocação pronominal',
          'Significação das palavras'
        ]
      },
      {
        id: 'logica',
        name: 'Raciocínio Lógico-Matemático',
        quantidade: 30,
        weight: 2,
        temas: [
          'Proposições, conectivos e tabelas-verdade',
          'Equivalências e negações lógicas',
          'Argumentação e validade de argumentos',
          'Diagramas lógicos',
          'Sequências e padrões numéricos',
          'Análise combinatória básica',
          'Probabilidade',
          'Raciocínio analítico e crítico',
          'Problemas de lógica',
          'Conjuntos e operações'
        ]
      },
      {
        id: 'direito',
        name: 'Direito Administrativo e Constitucional',
        quantidade: 30,
        weight: 2,
        temas: [
          'Princípios fundamentais da Constituição Federal',
          'Direitos e garantias fundamentais',
          'Organização do Estado brasileiro',
          'Administração Pública direta e indireta',
          'Princípios da Administração Pública (LIMPE)',
          'Atos administrativos',
          'Licitações e contratos (Lei 14.133/2021)',
          'Servidores públicos',
          'Responsabilidade civil do Estado',
          'Controle da Administração Pública',
          'Improbidade administrativa',
          'Lei de Acesso à Informação'
        ]
      },
      {
        id: 'especificos_tecnico',
        name: 'Conhecimentos Específicos - Técnico',
        quantidade: 90,
        weight: 3,
        temas: [
          'Hardware: componentes, arquitetura de computadores, memórias, processadores',
          'Manutenção preventiva e corretiva de microcomputadores',
          'Sistemas de armazenamento: RAID, NAS, SAN, backup',
          'Windows Server: instalação, configuração, Active Directory, GPO',
          'Windows 10/11: instalação, configuração, troubleshooting',
          'Linux: comandos básicos e avançados, gerenciamento de pacotes, permissões',
          'Redes de computadores: modelo OSI, TCP/IP, endereçamento IP, sub-redes',
          'Protocolos de rede: HTTP, HTTPS, FTP, SSH, DNS, DHCP',
          'Cabeamento estruturado: categorias, conectores, certificação',
          'Segurança da informação: firewall, antivírus, backup, criptografia',
          'Virtualização: conceitos, VMware, Hyper-V, VirtualBox',
          'Suporte ao usuário: help desk, service desk, ITIL básico',
          'Ferramentas de escritório: Microsoft Office, LibreOffice',
          'Impressoras e periféricos: instalação, configuração, manutenção',
          'VPN: conceitos, configuração, tipos'
        ]
      }
    ]
  }
};

// Prompt para geração de questões
function buildPrompt(cargo, materia, temas, quantidade) {
  const cargoNome = cargo === 'analista' ? 'Analista de Sistemas e Métodos' : 'Técnico de Suporte, Computação e Processamento';
  
  return `Você é um elaborador de questões para concursos públicos brasileiros. Gere questões EXATAMENTE no estilo da banca INSTITUTO IBDO PROJETOS.

CONTEXTO DO CONCURSO:
- Órgão: PRODERJ - Centro de Tecnologia da Informação e Comunicação do Estado do Rio de Janeiro
- Banca: Instituto IBDO Projetos
- Cargo: ${cargoNome}
- Escolaridade: ${cargo === 'analista' ? 'Nível Superior' : 'Nível Médio/Técnico'}

MATÉRIA: ${materia.name}
PESO: ${materia.weight}

TEMAS A COBRIR:
${temas.map(t => `- ${t}`).join('\n')}

═══════════════════════════════════════════════════════════
PADRÃO EXATO DA BANCA IBDO (baseado em provas reais 2024):
═══════════════════════════════════════════════════════════

ESTRUTURA: 4 alternativas (A, B, C, D) - SEMPRE frases completas

FORMATOS DE QUESTÃO (varie entre eles):

1. Pergunta Direta: "Qual das alternativas representa corretamente..."
2. Marque a CORRETA: "Marque a alternativa CORRETA que corresponde a..."
3. Avaliação de Itens: "Sobre [tema], avalie: I. II. III. Está correto:"
4. Verdadeiro/Falso: "Julgue V ou F... A sequência CORRETA é:"
5. EXCEÇÃO: "Todas corretas, com EXCEÇÃO de:"
6. Associação de Colunas: "Associe a 2ª coluna com a 1ª..."
7. Cenário Prático: "[Nome] está [situação]. Para [objetivo], deve:"

CARACTERÍSTICAS:
- Nível: MÉDIO-ALTO
- Foco em conhecimento APLICADO
- Alternativas são frases completas e explicativas
- Evita pegadinhas, mas exige atenção técnica

INSTRUÇÕES:
- Gere EXATAMENTE ${quantidade} questões
- Use TODOS os formatos acima (varie)
- Distribua uniformemente entre os temas
- Cada questão deve ser ÚNICA

FORMATO JSON OBRIGATÓRIO:
[
  {
    "text": "Enunciado completo",
    "options": [
      { "letter": "A", "text": "Alternativa A completa" },
      { "letter": "B", "text": "Alternativa B completa" },
      { "letter": "C", "text": "Alternativa C completa" },
      { "letter": "D", "text": "Alternativa D completa" }
    ],
    "correctAnswer": "B",
    "explanation": "Explicação detalhada da resposta correta"
  }
]

Retorne APENAS o JSON válido, sem texto adicional.`;
}

// Chamada à API OpenAI
async function callOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 16000
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Parse JSON da resposta
function parseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  return JSON.parse(cleaned.trim());
}

// Gera questões para uma matéria
async function gerarQuestoesPorMateria(cargo, materia, startId) {
  const questoes = [];
  const batchSize = 10; // Gerar em lotes de 10
  let currentId = startId;
  
  console.log(`\n📚 ${materia.name}: ${materia.quantidade} questões`);
  
  for (let i = 0; i < materia.quantidade; i += batchSize) {
    const qtdBatch = Math.min(batchSize, materia.quantidade - i);
    const temasIndex = i % materia.temas.length;
    const temasBatch = materia.temas.slice(temasIndex, temasIndex + 5).concat(
      materia.temas.slice(0, Math.max(0, 5 - (materia.temas.length - temasIndex)))
    );
    
    process.stdout.write(`   ⏳ Gerando ${i + 1}-${i + qtdBatch}...`);
    
    try {
      const prompt = buildPrompt(cargo, materia, temasBatch, qtdBatch);
      const response = await callOpenAI(prompt);
      const parsed = parseJSON(response);
      
      for (const q of parsed) {
        questoes.push({
          id: currentId++,
          subject: materia.id,
          subjectName: materia.name,
          weight: materia.weight,
          text: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || ''
        });
      }
      
      console.log(` ✅ ${parsed.length} geradas`);
      
      // Pequena pausa para não sobrecarregar a API
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (error) {
      console.log(` ❌ Erro: ${error.message}`);
    }
  }
  
  return { questoes, nextId: currentId };
}

// Gera todas as questões para um cargo
async function gerarQuestoesCargo(cargo) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  GERANDO QUESTÕES: ${cargo.toUpperCase()}`);
  console.log(`${'═'.repeat(60)}`);
  
  const estrutura = ESTRUTURA_PROVA[cargo];
  const todasQuestoes = [];
  let nextId = cargo === 'analista' ? 1 : 1001;
  
  for (const materia of estrutura.materias) {
    const result = await gerarQuestoesPorMateria(cargo, materia, nextId);
    todasQuestoes.push(...result.questoes);
    nextId = result.nextId;
  }
  
  return todasQuestoes;
}

// Formata questões para TypeScript
function formatTS(questoes) {
  return questoes.map(q => {
    const options = q.options.map(o => 
      `      { letter: '${o.letter}', text: \`${o.text.replace(/`/g, '\\`')}\` }`
    ).join(',\n');
    
    return `  {
    id: ${q.id},
    subject: '${q.subject}',
    subjectName: '${q.subjectName}',
    weight: ${q.weight},
    text: \`${q.text.replace(/`/g, '\\`')}\`,
    options: [
${options}
    ],
    correctAnswer: '${q.correctAnswer}',
    explanation: \`${(q.explanation || '').replace(/`/g, '\\`')}\`,
  }`;
  }).join(',\n');
}

// Salva arquivo TypeScript
function salvarArquivoTS(cargo, questoes) {
  const isAnalista = cargo === 'analista';
  const filePath = path.join(__dirname, '..', 'src', 'data', isAnalista ? 'questions.ts' : 'questionsTecnico.ts');
  
  const header = isAnalista ? `export interface Question {
  id: number;
  subject: string;
  subjectName: string;
  weight: number;
  text: string;
  options: {
    letter: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation?: string;
}

export interface SubjectInfo {
  id: string;
  name: string;
  questionCount: number;
  weight: number;
  maxPoints: number;
}

export const subjects: SubjectInfo[] = [
  { id: 'portugues', name: 'Língua Portuguesa', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'logica', name: 'Raciocínio Lógico-Matemático', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'direito', name: 'Direito Administrativo e Constitucional', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'especificos_analista', name: 'Conhecimentos Específicos - Analista', questionCount: 30, weight: 3, maxPoints: 90 },
];

` : `import { Question, SubjectInfo } from './questions';

export const subjectsTecnico: SubjectInfo[] = [
  { id: 'portugues', name: 'Língua Portuguesa', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'logica', name: 'Raciocínio Lógico-Matemático', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'direito', name: 'Direito Administrativo e Constitucional', questionCount: 10, weight: 2, maxPoints: 20 },
  { id: 'especificos_tecnico', name: 'Conhecimentos Específicos - Técnico', questionCount: 30, weight: 3, maxPoints: 90 },
];

`;

  const arrayName = isAnalista ? 'questions' : 'questionsTecnico';
  const content = `${header}export const ${arrayName}: Question[] = [
${formatTS(questoes)}
];

export const getQuestionsBySubject${isAnalista ? '' : 'Tecnico'} = (subjectId: string): Question[] => {
  return ${arrayName}.filter(q => q.subject === subjectId);
};

export const getTotalPoints${isAnalista ? '' : 'Tecnico'} = (answers: Map<number, string>): number => {
  let total = 0;
  ${arrayName}.forEach(q => {
    if (answers.get(q.id) === q.correctAnswer) {
      total += q.weight;
    }
  });
  return total;
};

export const getPassingScore${isAnalista ? '' : 'Tecnico'} = (): number => {
  const maxPoints = ${arrayName}.reduce((sum, q) => sum + q.weight, 0);
  return maxPoints * 0.5;
};
`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n💾 Salvo: ${path.basename(filePath)} (${questoes.length} questões)`);
}

// Main
async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('     GERADOR COMPLETO - BANCO DE QUESTÕES PRODERJ');
  console.log('     180 questões por cargo via OpenAI (GPT-4o-mini)');
  console.log('═══════════════════════════════════════════════════════════');
  
  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY não definida');
    process.exit(1);
  }
  
  const cargo = process.argv[2] || 'both';
  
  if (cargo === 'analista' || cargo === 'both') {
    const questoesAnalista = await gerarQuestoesCargo('analista');
    salvarArquivoTS('analista', questoesAnalista);
  }
  
  if (cargo === 'tecnico' || cargo === 'both') {
    const questoesTecnico = await gerarQuestoesCargo('tecnico');
    salvarArquivoTS('tecnico', questoesTecnico);
  }
  
  console.log('\n✨ Geração completa!');
  console.log('Execute "npm run build" para compilar.');
}

main().catch(console.error);
