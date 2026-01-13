/**
 * Script para gerar questões usando OpenAI API
 * Baseado no edital PRODERJ - Analista e Técnico
 * 
 * Uso: node scripts/generate-questions.js [analista|tecnico] [quantidade]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração da API
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Erro: Defina a variável OPENAI_API_KEY');
  console.log('Execute: $env:OPENAI_API_KEY="sua-chave-aqui"');
  process.exit(1);
}

// Tópicos do edital por cargo
const TOPICOS = {
  analista: {
    subject: 'especificos_analista',
    subjectName: 'Conhecimentos Específicos - TI',
    materias: [
      {
        nome: 'Engenharia de Software',
        temas: [
          'Ciclos de vida de software (cascata, iterativo, ágil)',
          'Requisitos funcionais e não-funcionais, técnicas de elicitação',
          'UML 2.5: diagramas de casos de uso, classes, sequência, atividades, estados, componentes',
          'BPMN 2.0: eventos, gateways, atividades, pools, lanes',
          'Padrões de projeto GoF: criacionais, estruturais, comportamentais',
          'Arquitetura de software: MVC, microsserviços, SOA, hexagonal, clean architecture',
          'DevOps: CI/CD, Docker, Kubernetes, pipelines',
          'Testes de software: unitários, integração, sistema, TDD, BDD'
        ]
      },
      {
        nome: 'Banco de Dados',
        temas: [
          'Modelagem ER e normalização (1FN, 2FN, 3FN, BCNF)',
          'SQL avançado: JOINs, subqueries, CTEs, window functions',
          'Índices, otimização de queries, planos de execução',
          'Transações ACID, níveis de isolamento, deadlocks',
          'NoSQL: MongoDB, Redis, Cassandra, conceitos CAP',
          'Data warehouse, OLAP, ETL, dimensões e fatos'
        ]
      },
      {
        nome: 'Segurança da Informação',
        temas: [
          'Criptografia simétrica e assimétrica, hashing, assinatura digital',
          'PKI, certificados digitais, ICP-Brasil',
          'OWASP Top 10, vulnerabilidades web (XSS, SQL Injection, CSRF)',
          'Autenticação e autorização: OAuth 2.0, JWT, SAML',
          'LGPD: princípios, direitos dos titulares, sanções',
          'ISO 27001/27002, gestão de riscos'
        ]
      },
      {
        nome: 'Redes e Infraestrutura',
        temas: [
          'Modelo OSI e TCP/IP, protocolos principais',
          'HTTP/HTTPS, REST, GraphQL, WebSockets',
          'Cloud computing: IaaS, PaaS, SaaS, modelos de implantação',
          'Virtualização e containers',
          'Load balancing, CDN, DNS, proxy reverso'
        ]
      },
      {
        nome: 'Metodologias Ágeis',
        temas: [
          'Scrum: papéis, cerimônias, artefatos, métricas',
          'Kanban: WIP, lead time, cycle time, CFD',
          'XP: pair programming, TDD, refactoring, integração contínua',
          'SAFe, LeSS, escalabilidade ágil'
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
          'Arquitetura de computadores: processadores, memória, barramentos',
          'RAID 0, 1, 5, 6, 10: configuração e recuperação',
          'Fontes de alimentação ATX, conectores, potência',
          'Diagnóstico de falhas: POST, beep codes, S.M.A.R.T.',
          'SSDs NVMe vs SATA, interfaces M.2, U.2',
          'Manutenção preventiva e corretiva'
        ]
      },
      {
        nome: 'Sistemas Operacionais Windows',
        temas: [
          'Active Directory: domínios, OUs, GPOs, replicação',
          'Windows Server: DHCP, DNS, WSUS, File Server',
          'PowerShell: cmdlets, scripts, automação',
          'Hyper-V: VMs, snapshots, replicação',
          'Troubleshooting: Event Viewer, Performance Monitor',
          'Backup e recuperação: wbadmin, VSS'
        ]
      },
      {
        nome: 'Sistemas Operacionais Linux',
        temas: [
          'Gerenciamento de pacotes: apt, yum, dnf',
          'Permissões: chmod, chown, ACLs, sudo',
          'Serviços: systemd, journalctl, crontab',
          'Rede: ifconfig, ip, netstat, ss, iptables, firewalld',
          'Shell scripting: bash, variáveis, loops, funções',
          'LVM, filesystems ext4, XFS, montagem'
        ]
      },
      {
        nome: 'Redes de Computadores',
        temas: [
          'VLANs, trunking 802.1Q, STP/RSTP',
          'Roteamento: estático, OSPF, BGP básico',
          'Switches gerenciáveis: configuração, port security',
          'Wi-Fi: padrões 802.11, WPA2/WPA3, canais',
          'Cabeamento estruturado: Cat5e, Cat6, Cat6a, fibra óptica',
          'Ferramentas: ping, traceroute, nslookup, Wireshark'
        ]
      },
      {
        nome: 'Segurança e Backup',
        temas: [
          'Firewall: regras, NAT, DMZ',
          'Antivírus e antimalware, EDR',
          'Backup: completo, incremental, diferencial, 3-2-1',
          'Criptografia de disco: BitLocker, LUKS',
          'VPN: IPSec, OpenVPN, WireGuard'
        ]
      }
    ]
  }
};

// Prompt base para geração de questões - Padrão IBDO Projetos
function buildPrompt(cargo, materia, temas, quantidade) {
  return `Você é um especialista em elaboração de questões para concursos públicos brasileiros, especificamente no estilo da banca INSTITUTO IBDO PROJETOS.

CONTEXTO DO CONCURSO:
- Órgão: PRODERJ - Centro de Tecnologia da Informação e Comunicação do Estado do Rio de Janeiro
- Banca Organizadora: Instituto IBDO Projetos (banca regional do RJ, fundada em 2009)
- Cargo: ${cargo === 'analista' ? 'Analista de Sistemas e Métodos' : 'Técnico de Suporte, Computação e Processamento'}
- Escolaridade: ${cargo === 'analista' ? 'Nível Superior em TI' : 'Nível Médio/Técnico'}

MATÉRIA: ${materia}

TEMAS DO EDITAL A COBRIR:
${temas.map(t => `- ${t}`).join('\n')}

CARACTERÍSTICAS DA BANCA IBDO PROJETOS:
1. Questões objetivas de múltipla escolha com 4 alternativas (A, B, C, D)
2. Enunciados DIRETOS e CLAROS, sem ambiguidades
3. Linguagem técnica precisa, adequada ao nível do cargo
4. Alternativas bem elaboradas - os distratores devem ser plausíveis
5. Cobrança de conhecimento APLICADO e PRÁTICO, não apenas teórico
6. Pode incluir pequenos cenários ou situações-problema
7. Nível de dificuldade: MÉDIO-ALTO para cargos técnicos de TI
8. Evita pegadinhas, mas exige atenção aos detalhes técnicos

INSTRUÇÕES ESPECÍFICAS:
- Gere ${quantidade} questões de ALTO NÍVEL que realmente testem o conhecimento do candidato
- Inclua questões que cobrem temas frequentes em concursos de TI do Rio de Janeiro
- Cada questão deve ter explicação técnica detalhada do gabarito
- Priorize temas que caem com frequência em provas de órgãos públicos de tecnologia

FORMATO DE SAÍDA (JSON válido):
[
  {
    "text": "Enunciado completo da questão (pode incluir contexto ou cenário)",
    "options": [
      { "letter": "A", "text": "Alternativa A" },
      { "letter": "B", "text": "Alternativa B" },
      { "letter": "C", "text": "Alternativa C" },
      { "letter": "D", "text": "Alternativa D" }
    ],
    "correctAnswer": "B",
    "explanation": "Explicação detalhada de por que B é correta e as outras são incorretas"
  }
]

Gere EXATAMENTE ${quantidade} questões no formato JSON acima. Retorne APENAS o JSON, sem texto adicional.`;
}

async function callOpenAI(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em concursos públicos brasileiros, especialmente na área de TI. Gere questões técnicas de alto nível.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API Error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function parseQuestions(jsonString) {
  // Remove markdown code blocks if present
  let cleaned = jsonString.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  }
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  
  return JSON.parse(cleaned.trim());
}

async function generateQuestions(cargo, quantidadePorMateria = 5) {
  const config = TOPICOS[cargo];
  if (!config) {
    console.error(`❌ Cargo inválido: ${cargo}. Use 'analista' ou 'tecnico'`);
    process.exit(1);
  }

  console.log(`\n🎯 Gerando questões para: ${cargo.toUpperCase()}`);
  console.log(`📚 Matérias: ${config.materias.length}`);
  console.log(`📝 Questões por matéria: ${quantidadePorMateria}\n`);

  const allQuestions = [];
  let startId = cargo === 'analista' ? 200 : 1200; // IDs únicos para novas questões

  for (const materia of config.materias) {
    console.log(`⏳ Gerando: ${materia.nome}...`);
    
    try {
      const prompt = buildPrompt(cargo, materia.nome, materia.temas, quantidadePorMateria);
      const response = await callOpenAI(prompt);
      const questions = parseQuestions(response);
      
      // Adiciona metadados
      const formattedQuestions = questions.map((q, idx) => ({
        id: startId++,
        subject: config.subject,
        subjectName: config.subjectName,
        weight: 3,
        ...q
      }));
      
      allQuestions.push(...formattedQuestions);
      console.log(`✅ ${materia.nome}: ${questions.length} questões geradas`);
      
      // Delay para evitar rate limiting
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (error) {
      console.error(`❌ Erro em ${materia.nome}: ${error.message}`);
    }
  }

  return allQuestions;
}

function saveQuestions(questions, cargo) {
  const outputDir = path.join(__dirname, '..', 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `questoes-${cargo}-${timestamp}.json`;
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(questions, null, 2), 'utf8');
  console.log(`\n💾 Questões salvas em: ${filepath}`);
  
  // Gera também formato TypeScript
  const tsFilename = `questoes-${cargo}-${timestamp}.ts`;
  const tsFilepath = path.join(outputDir, tsFilename);
  
  const tsContent = `// Questões geradas automaticamente via OpenAI - ${timestamp}
// Cargo: ${cargo.toUpperCase()}
// Total: ${questions.length} questões

export const questoesGeradas = ${JSON.stringify(questions, null, 2)};
`;
  
  fs.writeFileSync(tsFilepath, tsContent, 'utf8');
  console.log(`💾 Formato TypeScript: ${tsFilepath}`);
  
  return { json: filepath, ts: tsFilepath };
}

// Main
async function main() {
  const args = process.argv.slice(2);
  const cargo = args[0] || 'analista';
  const quantidade = parseInt(args[1]) || 5;
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('       GERADOR DE QUESTÕES PRODERJ - OpenAI API');
  console.log('═══════════════════════════════════════════════════════════');
  
  try {
    const questions = await generateQuestions(cargo, quantidade);
    
    if (questions.length > 0) {
      saveQuestions(questions, cargo);
      console.log(`\n✨ Total gerado: ${questions.length} questões`);
      console.log('\n📋 Para integrar ao projeto, copie as questões do arquivo .ts');
      console.log('   para o arquivo src/data/questions.ts ou questionsTecnico.ts');
    } else {
      console.log('\n⚠️ Nenhuma questão foi gerada.');
    }
    
  } catch (error) {
    console.error(`\n❌ Erro fatal: ${error.message}`);
    process.exit(1);
  }
}

main();
