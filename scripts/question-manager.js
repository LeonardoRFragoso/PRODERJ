/**
 * Gerenciador de Questões com Histórico e Controle de Duplicidade
 * 
 * Funcionalidades:
 * - Gera questões via OpenAI evitando duplicatas
 * - Mantém histórico de todas as questões geradas
 * - Integra automaticamente ao projeto
 * 
 * Uso:
 *   node scripts/question-manager.js generate [analista|tecnico] [quantidade]
 *   node scripts/question-manager.js integrate
 *   node scripts/question-manager.js stats
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos
const PATHS = {
  history: path.join(__dirname, '..', 'data', 'questions-history.json'),
  dataDir: path.join(__dirname, '..', 'data'),
  questionsAnalista: path.join(__dirname, '..', 'src', 'data', 'questions.ts'),
  questionsTecnico: path.join(__dirname, '..', 'src', 'data', 'questionsTecnico.ts'),
};

// API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Tópicos do edital
const TOPICOS = {
  analista: {
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - TI',
    materias: [
      {
        nome: 'Engenharia de Software',
        temas: [
          'Ciclos de vida: cascata, iterativo, ágil, DevOps',
          'Requisitos funcionais e não-funcionais, técnicas de elicitação',
          'UML 2.5: casos de uso, classes, sequência, atividades, estados',
          'BPMN 2.0: eventos, gateways, atividades, pools, lanes',
          'Padrões de projeto GoF: criacionais, estruturais, comportamentais',
          'Arquitetura: MVC, microsserviços, SOA, hexagonal, clean architecture',
          'DevOps: CI/CD, Docker, Kubernetes, pipelines, GitOps',
          'Testes: unitários, integração, E2E, TDD, BDD, cobertura'
        ]
      },
      {
        nome: 'Banco de Dados',
        temas: [
          'Modelagem ER e normalização (1FN, 2FN, 3FN, BCNF)',
          'SQL avançado: JOINs, subqueries, CTEs, window functions',
          'Índices, otimização, planos de execução, EXPLAIN',
          'Transações ACID, níveis de isolamento, locks, deadlocks',
          'NoSQL: MongoDB, Redis, Cassandra, teorema CAP',
          'Data warehouse, OLAP, ETL, modelagem dimensional'
        ]
      },
      {
        nome: 'Segurança da Informação',
        temas: [
          'Criptografia simétrica/assimétrica, hashing, assinatura digital',
          'PKI, certificados digitais, ICP-Brasil',
          'OWASP Top 10: XSS, SQL Injection, CSRF, SSRF',
          'Autenticação: OAuth 2.0, OpenID Connect, JWT, SAML',
          'LGPD: princípios, bases legais, direitos, sanções',
          'ISO 27001/27002, gestão de riscos, SGSI'
        ]
      },
      {
        nome: 'Redes e Cloud',
        temas: [
          'Modelo OSI e TCP/IP, protocolos principais',
          'HTTP/HTTPS, REST, GraphQL, gRPC, WebSockets',
          'Cloud: IaaS, PaaS, SaaS, serverless, containers',
          'AWS/Azure/GCP: serviços principais, bem arquitetado',
          'Load balancing, CDN, DNS, API Gateway'
        ]
      },
      {
        nome: 'Metodologias Ágeis',
        temas: [
          'Scrum: papéis, eventos, artefatos, métricas',
          'Kanban: WIP, lead time, cycle time, CFD',
          'XP: pair programming, TDD, refactoring, CI',
          'SAFe, LeSS, Nexus, escalabilidade ágil'
        ]
      }
    ]
  },
  tecnico: {
    subject: 'especificos_tecnico',
    subjectName: 'Conhecimentos Específicos - Técnico',
    materias: [
      {
        nome: 'Hardware e Manutenção',
        temas: [
          'Arquitetura: processadores, memória, barramentos, chipsets',
          'RAID 0, 1, 5, 6, 10: configuração e recuperação',
          'Fontes ATX, conectores, cálculo de potência',
          'Diagnóstico: POST, beep codes, S.M.A.R.T., memtest',
          'SSDs NVMe vs SATA, interfaces M.2, U.2, PCIe',
          'Manutenção preventiva, corretiva, preditiva'
        ]
      },
      {
        nome: 'Windows Server e Active Directory',
        temas: [
          'Active Directory: domínios, OUs, GPOs, replicação',
          'DHCP, DNS, WINS, File Server, Print Server',
          'PowerShell: cmdlets, scripts, automação, remoting',
          'Hyper-V: VMs, snapshots, replicação, live migration',
          'Event Viewer, Performance Monitor, Resource Monitor',
          'Backup: wbadmin, VSS, Windows Server Backup'
        ]
      },
      {
        nome: 'Linux Administration',
        temas: [
          'Gerenciamento de pacotes: apt, yum, dnf, snap',
          'Permissões: chmod, chown, ACLs, sudo, sudoers',
          'Systemd: units, services, journalctl, timers',
          'Rede: ip, ss, netstat, iptables, firewalld, nftables',
          'Shell scripting: bash, variáveis, loops, funções',
          'LVM, filesystems, fstab, mount, fdisk, parted'
        ]
      },
      {
        nome: 'Redes de Computadores',
        temas: [
          'VLANs, trunking 802.1Q, STP/RSTP/MSTP',
          'Roteamento: estático, OSPF, RIP, conceitos BGP',
          'Switches: configuração, port security, LACP',
          'Wi-Fi: 802.11ax, WPA3, canais, interferência',
          'Cabeamento: Cat5e, Cat6, Cat6a, fibra OM3/OS2',
          'Ferramentas: ping, traceroute, nmap, Wireshark, tcpdump'
        ]
      },
      {
        nome: 'Segurança e Backup',
        temas: [
          'Firewall: regras, NAT, PAT, DMZ, zonas',
          'Antivírus, EDR, XDR, threat detection',
          'Backup: completo, incremental, diferencial, regra 3-2-1',
          'Criptografia: BitLocker, LUKS, VeraCrypt',
          'VPN: IPSec, SSL/TLS, OpenVPN, WireGuard'
        ]
      }
    ]
  }
};

// ============================================
// HISTÓRICO DE QUESTÕES
// ============================================

function loadHistory() {
  if (!fs.existsSync(PATHS.dataDir)) {
    fs.mkdirSync(PATHS.dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(PATHS.history)) {
    const initial = {
      version: '1.0',
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      stats: {
        totalGenerated: 0,
        analista: 0,
        tecnico: 0,
        duplicatesAvoided: 0
      },
      questions: [],
      hashes: []
    };
    fs.writeFileSync(PATHS.history, JSON.stringify(initial, null, 2));
    return initial;
  }
  
  return JSON.parse(fs.readFileSync(PATHS.history, 'utf8'));
}

function saveHistory(history) {
  history.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PATHS.history, JSON.stringify(history, null, 2));
}

function generateHash(text) {
  // Normaliza o texto para comparação
  const normalized = text
    .toLowerCase()
    .replace(/[^a-záàâãéèêíìîóòôõúùûç0-9\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  return crypto.createHash('md5').update(normalized).digest('hex');
}

function isDuplicate(history, questionText) {
  const hash = generateHash(questionText);
  return history.hashes.includes(hash);
}

function addToHistory(history, question, cargo) {
  const hash = generateHash(question.text);
  
  if (!history.hashes.includes(hash)) {
    history.hashes.push(hash);
    history.questions.push({
      id: question.id,
      cargo,
      materia: question.materia || 'N/A',
      text: question.text,
      hash,
      createdAt: new Date().toISOString()
    });
    history.stats.totalGenerated++;
    history.stats[cargo]++;
    return true;
  }
  
  history.stats.duplicatesAvoided++;
  return false;
}

// ============================================
// GERAÇÃO DE QUESTÕES
// ============================================

function buildPrompt(cargo, materia, temas, quantidade, existingQuestions) {
  const existingList = existingQuestions.length > 0 
    ? `\n\nQUESTÕES JÁ EXISTENTES (NÃO REPETIR TEMAS SIMILARES):\n${existingQuestions.slice(-20).map(q => `- ${q.text.substring(0, 100)}...`).join('\n')}`
    : '';

  return `Você é um elaborador de questões para concursos públicos brasileiros. Gere questões EXATAMENTE no estilo da banca INSTITUTO IBDO PROJETOS.

CONTEXTO DO CONCURSO:
- Órgão: PRODERJ - Centro de Tecnologia da Informação e Comunicação do Estado do Rio de Janeiro
- Banca: Instituto IBDO Projetos (banca regional do RJ, fundada em 2009)
- Cargo: ${cargo === 'analista' ? 'Analista de Sistemas e Métodos' : 'Técnico de Suporte, Computação e Processamento'}
- Escolaridade: ${cargo === 'analista' ? 'Nível Superior em TI' : 'Nível Médio/Técnico'}

MATÉRIA: ${materia}

TEMAS DO EDITAL:
${temas.map(t => `- ${t}`).join('\n')}

═══════════════════════════════════════════════════════════
PADRÃO EXATO DA BANCA IBDO (baseado em provas reais 2024):
═══════════════════════════════════════════════════════════

ESTRUTURA DAS QUESTÕES:
1. 4 alternativas (A, B, C, D) - SEMPRE frases completas, não apenas palavras
2. Enunciados DIRETOS e CLAROS - sem rodeios ou textos longos desnecessários
3. Alternativas plausíveis - distratores técnicos que parecem corretos

FORMATOS DE QUESTÃO USADOS PELA IBDO (varie entre eles):

FORMATO 1 - Pergunta Direta:
"Qual das seguintes alternativas representa corretamente [conceito]?"

FORMATO 2 - Marque a CORRETA:
"Marque a alternativa CORRETA que corresponde a [descrição do conceito]:"

FORMATO 3 - Avaliação de Itens (I, II, III):
"Sobre [tema], avalie as afirmativas:
I. [afirmativa 1]
II. [afirmativa 2]  
III. [afirmativa 3]
Está(ão) CORRETA(S) a(s) afirmativa(s):"
a) I, apenas.
b) I e II, apenas.
c) II e III, apenas.
d) I, II e III.

FORMATO 4 - Verdadeiro/Falso:
"Julgue com V ou F as afirmativas:
(__) [afirmativa 1]
(__) [afirmativa 2]
A sequência CORRETA é:"

FORMATO 5 - EXCEÇÃO (negativa):
"Todas as alternativas a seguir estão corretas, com EXCEÇÃO de:"

FORMATO 6 - Associação de Colunas:
"Associe a segunda coluna de acordo com a primeira:
Primeira coluna: 1.[termo] 2.[termo] 3.[termo]
Segunda coluna: (__)[definição] (__)[definição] (__)[definição]
A sequência CORRETA é:"

FORMATO 7 - Cenário Prático:
"[Nome] está configurando [situação]. Para [objetivo], ele deve:"

CARACTERÍSTICAS IMPORTANTES:
- Nível: MÉDIO-ALTO (exige conhecimento técnico real)
- Foco em conhecimento APLICADO, não apenas decoreba
- Alternativas são frases completas e explicativas
- Evita pegadinhas, mas exige atenção aos detalhes técnicos
- Pode usar contexto de situação real de trabalho${existingList}

INSTRUÇÕES:
- Gere ${quantidade} questões usando os FORMATOS acima (varie entre eles)
- Cada questão deve ser ÚNICA e testar conhecimento específico
- Priorize temas frequentes em concursos de TI
- Para Analista: foco em arquitetura, padrões, metodologias
- Para Técnico: foco em configuração, troubleshooting, comandos

FORMATO JSON OBRIGATÓRIO:
[
  {
    "text": "Enunciado completo da questão (usando um dos formatos IBDO)",
    "options": [
      { "letter": "A", "text": "Alternativa A completa" },
      { "letter": "B", "text": "Alternativa B completa" },
      { "letter": "C", "text": "Alternativa C completa" },
      { "letter": "D", "text": "Alternativa D completa" }
    ],
    "correctAnswer": "B",
    "explanation": "Explicação técnica detalhada"
  }
]

Retorne APENAS o JSON válido.`;
}

async function callOpenAI(prompt) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY não definida');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você gera questões de concurso em JSON válido.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function parseJSON(jsonString) {
  let cleaned = jsonString.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  return JSON.parse(cleaned.trim());
}

async function generateQuestions(cargo, quantidadePorMateria = 5) {
  const config = TOPICOS[cargo];
  if (!config) {
    console.error(`❌ Cargo inválido: ${cargo}`);
    process.exit(1);
  }

  const history = loadHistory();
  const existingForCargo = history.questions.filter(q => q.cargo === cargo);
  
  console.log(`\n🎯 Gerando questões para: ${cargo.toUpperCase()}`);
  console.log(`📚 Matérias: ${config.materias.length}`);
  console.log(`📝 Questões por matéria: ${quantidadePorMateria}`);
  console.log(`📊 Histórico: ${existingForCargo.length} questões já existentes\n`);

  const allQuestions = [];
  let nextId = cargo === 'analista' ? 300 : 1300;
  
  // Encontra o maior ID existente
  const maxExistingId = history.questions
    .filter(q => q.cargo === cargo)
    .reduce((max, q) => Math.max(max, q.id || 0), nextId);
  nextId = maxExistingId + 1;

  for (const materia of config.materias) {
    console.log(`⏳ Gerando: ${materia.nome}...`);
    
    try {
      const existingForMateria = existingForCargo.filter(q => 
        q.materia === materia.nome
      );
      
      const prompt = buildPrompt(
        cargo, 
        materia.nome, 
        materia.temas, 
        quantidadePorMateria,
        existingForMateria
      );
      
      const response = await callOpenAI(prompt);
      const questions = parseJSON(response);
      
      let added = 0;
      let duplicates = 0;
      
      for (const q of questions) {
        if (isDuplicate(history, q.text)) {
          duplicates++;
          continue;
        }
        
        const formattedQuestion = {
          id: nextId++,
          subject: config.subject,
          subjectName: config.subjectName,
          weight: 3,
          materia: materia.nome,
          ...q
        };
        
        addToHistory(history, formattedQuestion, cargo);
        allQuestions.push(formattedQuestion);
        added++;
      }
      
      console.log(`✅ ${materia.nome}: ${added} novas | ${duplicates} duplicatas evitadas`);
      
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (error) {
      console.error(`❌ Erro em ${materia.nome}: ${error.message}`);
    }
  }

  saveHistory(history);
  
  return allQuestions;
}

// ============================================
// INTEGRAÇÃO AO PROJETO
// ============================================

function integrateQuestions() {
  const history = loadHistory();
  
  console.log('\n📦 Integrando questões ao projeto...\n');
  
  // Questões não integradas
  const pendingAnalista = history.questions.filter(q => 
    q.cargo === 'analista' && !q.integrated
  );
  const pendingTecnico = history.questions.filter(q => 
    q.cargo === 'tecnico' && !q.integrated
  );
  
  console.log(`📋 Analista: ${pendingAnalista.length} questões pendentes`);
  console.log(`📋 Técnico: ${pendingTecnico.length} questões pendentes`);
  
  if (pendingAnalista.length === 0 && pendingTecnico.length === 0) {
    console.log('\n✅ Nenhuma questão pendente para integrar.');
    return;
  }
  
  // Marca como integradas
  history.questions.forEach(q => {
    if (!q.integrated) {
      q.integrated = true;
      q.integratedAt = new Date().toISOString();
    }
  });
  
  saveHistory(history);
  
  console.log('\n✅ Questões marcadas como integradas.');
  console.log('📝 Copie manualmente do arquivo questions-history.json para os arquivos .ts');
}

function showStats() {
  const history = loadHistory();
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('              ESTATÍSTICAS DO BANCO DE QUESTÕES');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log(`📊 Total geradas via OpenAI: ${history.stats.totalGenerated}`);
  console.log(`   - Analista: ${history.stats.analista}`);
  console.log(`   - Técnico: ${history.stats.tecnico}`);
  console.log(`   - Duplicatas evitadas: ${history.stats.duplicatesAvoided}`);
  console.log(`\n📅 Criado em: ${history.created}`);
  console.log(`📅 Última atualização: ${history.lastUpdated}`);
  
  // Questões por matéria
  const byMateria = {};
  history.questions.forEach(q => {
    const key = `${q.cargo}/${q.materia}`;
    byMateria[key] = (byMateria[key] || 0) + 1;
  });
  
  if (Object.keys(byMateria).length > 0) {
    console.log('\n📚 Questões por Matéria:');
    Object.entries(byMateria).sort().forEach(([key, count]) => {
      console.log(`   ${key}: ${count}`);
    });
  }
}

// ============================================
// MAIN
// ============================================

async function main() {
  const [command, ...args] = process.argv.slice(2);
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('     GERENCIADOR DE QUESTÕES PRODERJ - OpenAI + Histórico');
  console.log('═══════════════════════════════════════════════════════════');
  
  switch (command) {
    case 'generate':
      if (!OPENAI_API_KEY) {
        console.error('\n❌ Defina: $env:OPENAI_API_KEY="sua-chave"');
        process.exit(1);
      }
      const cargo = args[0] || 'analista';
      const qtd = parseInt(args[1]) || 5;
      const questions = await generateQuestions(cargo, qtd);
      console.log(`\n✨ Total gerado: ${questions.length} novas questões`);
      console.log(`💾 Histórico salvo em: ${PATHS.history}`);
      break;
      
    case 'integrate':
      integrateQuestions();
      break;
      
    case 'stats':
      showStats();
      break;
      
    default:
      console.log(`
Uso:
  node scripts/question-manager.js generate [analista|tecnico] [qtd]
  node scripts/question-manager.js integrate
  node scripts/question-manager.js stats

Exemplos:
  $env:OPENAI_API_KEY="sk-..."; node scripts/question-manager.js generate analista 10
  node scripts/question-manager.js stats
      `);
  }
}

main().catch(console.error);
