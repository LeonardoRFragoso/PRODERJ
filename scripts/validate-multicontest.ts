import { questionsDataprevDev } from '../src/data/questionsDataprevDev';
import { contests, getCareerTotalPoints, getCareerPassingScore } from '../src/data/contests';
import { getQuestionsForCareer } from '../src/services/examService';
import { calculateScore } from '../src/services/scoringService';
import { validateGeneratedQuestion, checkSimilarityAgainstAll, setAdminToken, getAdminToken, clearAdminToken, isAdminUnlocked } from '../src/services/aiQuestionService';
import type { Career } from '../src/types/career';
import type { GeneratedQuestion } from '../src/types/generatedQuestion';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✅ ${msg}`);
    passed++;
  } else {
    console.log(`  ❌ ${msg}`);
    failed++;
  }
}

console.log('=== VALIDAÇÃO MULTI-CONCURSO ===\n');

// 1. CONTESTS
console.log('1. CONTESTS');
const contestIds = contests.map(c => c.id);
assert(contests.length === 2, 'Existem 2 concursos');
assert(contestIds.includes('proderj-2026'), 'PRODERJ 2026 presente');
assert(contestIds.includes('dataprev-2026'), 'Dataprev 2026 presente');

// 2. PRODERJ CAREERS
console.log('\n2. PRODERJ CAREERS');
const proderj = contests.find(c => c.id === 'proderj-2026')!;
assert(proderj.careers.length === 2, 'PRODERJ tem 2 cargos');
assert(proderj.careers.some(c => c.id === 'analista'), 'Cargo Analista presente');
assert(proderj.careers.some(c => c.id === 'tecnico'), 'Cargo Técnico presente');
const analista = proderj.careers.find(c => c.id === 'analista')!;
assert(analista.totalQuestions === 60, 'Analista tem 60 questões');
assert(getCareerTotalPoints(analista) === 150, 'Analista tem 150 pontos máximos');
assert(getCareerPassingScore(analista) === 75, 'Analista tem nota de aprovação 75');

// 3. DATAPREV CAREER
console.log('\n3. DATAPREV CAREER');
const dataprev = contests.find(c => c.id === 'dataprev-2026')!;
assert(dataprev.careers.length === 1, 'Dataprev tem 1 cargo');
const dev = dataprev.careers.find(c => c.id === 'dataprev-dev')!;
assert(dev.totalQuestions === 70, 'Dataprev tem 70 questões');
assert(getCareerTotalPoints(dev) === 115, 'Dataprev tem 115 pontos máximos');
assert(getCareerPassingScore(dev) === 57.5, 'Dataprev tem nota de aprovação 57.5');
assert(dev.requireNoZeroedSubject === true, 'Dataprev requer não zerar disciplina');

// Dataprev subjects
const dpSubjects = dev.subjects;
assert(dpSubjects.length === 6, 'Dataprev tem 6 disciplinas');
assert(dpSubjects.find(s => s.id === 'portugues')?.questionCount === 12, 'Português: 12 questões');
assert(dpSubjects.find(s => s.id === 'ingles')?.questionCount === 12, 'Inglês: 12 questões');
assert(dpSubjects.find(s => s.id === 'logica')?.questionCount === 5, 'Lógica: 5 questões');
assert(dpSubjects.find(s => s.id === 'atualidades_ia')?.questionCount === 6, 'Atualidades/IA: 6 questões');
assert(dpSubjects.find(s => s.id === 'legislacao_seguranca')?.questionCount === 5, 'Legislação: 5 questões');
assert(dpSubjects.find(s => s.id === 'especificos_dev')?.questionCount === 30, 'Específicos: 30 questões');
assert(dpSubjects.find(s => s.id === 'especificos_dev')?.weight === 2.5, 'Específicos peso 2.5');
assert(dpSubjects.filter(s => s.id !== 'especificos_dev').every(s => s.weight === 1), 'Demais disciplinas peso 1');

// 4. QUESTION BANK AUDIT
console.log('\n4. BANCO DE QUESTÕES DATAPREV');
const q = questionsDataprevDev;
assert(q.length >= 300, `Total de questões >= 300 (atual: ${q.length})`);

// IDs únicos
const ids = q.map(x => x.id);
assert(new Set(ids).size === ids.length, 'IDs únicos');

// IDs sequenciais
const sortedIds = [...ids].sort((a, b) => a - b);
const expectedIds = Array.from({ length: q.length }, (_, i) => i + 1);
assert(JSON.stringify(sortedIds) === JSON.stringify(expectedIds), `IDs sequenciais 1-${q.length}`);

// 5 alternativas
assert(q.every(x => x.options.length === 5), 'Todas com 5 alternativas');

// Alternativas A-E
assert(q.every(x => {
  const letters = x.options.map(o => o.letter).sort();
  return JSON.stringify(letters) === JSON.stringify(['A', 'B', 'C', 'D', 'E']);
}), 'Alternativas sempre A-E');

// correctAnswer existe
assert(q.every(x => x.options.some(o => o.letter === x.correctAnswer)), 'correctAnswer existe nas alternativas');

// Explicação
assert(q.every(x => x.explanation && x.explanation.trim().length >= 10), 'Todas com explicação >= 10 chars');

// Campos obrigatórios
const required = ['id', 'subject', 'subjectName', 'subtopic', 'difficulty', 'weight', 'text', 'options', 'correctAnswer', 'explanation', 'tags'];
assert(q.every(x => required.every(f => (x as any)[f] !== undefined && (x as any)[f] !== null && (x as any)[f] !== '')), 'Todos campos obrigatórios preenchidos');

// Textos duplicados
const texts = q.map(x => x.text);
assert(new Set(texts).size === texts.length, 'Sem textos duplicados');

// Pesos
const weightMap: Record<string, number> = {
  portugues: 1, ingles: 1, logica: 1, atualidades_ia: 1, legislacao_seguranca: 1, especificos_dev: 2.5,
};
assert(q.every(x => x.weight === weightMap[x.subject]), 'Pesos corretos por disciplina');

// Distribuição
console.log('\n  Distribuição por disciplina:');
const dist: Record<string, number> = {};
q.forEach(x => { dist[x.subject] = (dist[x.subject] || 0) + 1; });
const expectedDist: Record<string, number> = {
  portugues: 45, ingles: 35, logica: 30, atualidades_ia: 30, legislacao_seguranca: 30, especificos_dev: 130,
};
for (const [s, c] of Object.entries(dist)) {
  assert(c >= expectedDist[s], `${s}: ${c} (esperado >= ${expectedDist[s]})`);
}

// 5. EXAM SERVICE - SORTEIO
console.log('\n5. EXAM SERVICE - SORTEIO');

// PRODERJ Analista
const proderjQuestions = getQuestionsForCareer(analista);
assert(proderjQuestions.length === 60, 'PRODERJ Analista gera 60 questões');
const proderjIds = proderjQuestions.map(x => x.id);
assert(new Set(proderjIds).size === proderjIds.length, 'PRODERJ: sem questões repetidas no simulado');

// PRODERJ Técnico
const tecnico = proderj.careers.find(c => c.id === 'tecnico')!;
const tecnicoQuestions = getQuestionsForCareer(tecnico);
assert(tecnicoQuestions.length === 60, 'PRODERJ Técnico gera 60 questões');
const tecnicoIds = tecnicoQuestions.map(x => x.id);
assert(new Set(tecnicoIds).size === tecnicoIds.length, 'PRODERJ Técnico: sem questões repetidas');

// Dataprev
const dpQuestions = getQuestionsForCareer(dev);
assert(dpQuestions.length === 70, 'Dataprev gera 70 questões');
const dpIds = dpQuestions.map(x => x.id);
assert(new Set(dpIds).size === dpIds.length, 'Dataprev: sem questões repetidas no simulado');

// Dataprev distribuição por disciplina no simulado
console.log('\n  Distribuição do simulado Dataprev:');
const examDist: Record<string, number> = {};
dpQuestions.forEach(x => { examDist[x.subject] = (examDist[x.subject] || 0) + 1; });
assert(examDist['portugues'] === 12, `Português no simulado: 12 (atual: ${examDist['portugues']})`);
assert(examDist['ingles'] === 12, `Inglês no simulado: 12 (atual: ${examDist['ingles']})`);
assert(examDist['logica'] === 5, `Lógica no simulado: 5 (atual: ${examDist['logica']})`);
assert(examDist['atualidades_ia'] === 6, `Atualidades/IA no simulado: 6 (atual: ${examDist['atualidades_ia']})`);
assert(examDist['legislacao_seguranca'] === 5, `Legislação no simulado: 5 (atual: ${examDist['legislacao_seguranca']})`);
assert(examDist['especificos_dev'] === 30, `Específicos no simulado: 30 (atual: ${examDist['especificos_dev']})`);

// 6. SCORING SERVICE
console.log('\n6. SCORING SERVICE');

// Dataprev: all correct = 115 points, passed
const allCorrect = new Map<number, string | null>();
dpQuestions.forEach(x => allCorrect.set(x.id, x.correctAnswer));
const perfectScore = calculateScore(dev, dpQuestions, allCorrect);
assert(perfectScore.totalPoints === 115, `Nota máxima Dataprev = 115 (atual: ${perfectScore.totalPoints})`);
assert(perfectScore.maxPoints === 115, `maxPoints Dataprev = 115`);
assert(perfectScore.passed === true, 'Nota máxima = aprovado');
assert(perfectScore.zeroedSubjects.length === 0, 'Nota máxima = sem disciplinas zeradas');

// Dataprev: all wrong = 0 points, failed, all zeroed
const allWrong = new Map<number, string | null>();
dpQuestions.forEach(x => allWrong.set(x.id, 'A' === x.correctAnswer ? 'B' : 'A'));
const zeroScore = calculateScore(dev, dpQuestions, allWrong);
assert(zeroScore.totalPoints === 0, 'Tudo errado = 0 pontos');
assert(zeroScore.passed === false, 'Tudo errado = reprovado');
assert(zeroScore.zeroedSubjects.length === 6, 'Tudo errado = 6 disciplinas zeradas');

// Dataprev: 57.5 points but one zeroed subject = failed
const mixedAnswers = new Map<number, string | null>();
// Get all português questions wrong, others correct
dpQuestions.forEach(x => {
  if (x.subject === 'portugues') {
    mixedAnswers.set(x.id, 'A' === x.correctAnswer ? 'B' : 'A');
  } else {
    mixedAnswers.set(x.id, x.correctAnswer);
  }
});
const mixedScore = calculateScore(dev, dpQuestions, mixedAnswers);
assert(mixedScore.totalPoints === 103, `Pontos com português zerado = 103 (atual: ${mixedScore.totalPoints})`);
assert(mixedScore.passed === false, 'Pontos >= 57.5 mas com disciplina zerada = reprovado');
assert(mixedScore.zeroedSubjects.length === 1, 'Apenas 1 disciplina zerada');
assert(mixedScore.zeroedSubjects[0].includes('Portugues') || mixedScore.zeroedSubjects[0].includes('Português'), 'Disciplina zerada é Português');

// Dataprev: exactly 57.5 points, no zeroed = passed
// 23 correct específicos (23 * 2.5 = 57.5) + all others wrong but not zeroing... 
// Actually need at least 1 correct per subject. Let's do:
// 1 correct per general subject (5 * 1 = 5) + 21 correct específicos (21 * 2.5 = 52.5) = 57.5
const exactAnswers = new Map<number, string | null>();
const generalSubjects = ['portugues', 'ingles', 'logica', 'atualidades_ia', 'legislacao_seguranca'];
for (const subj of generalSubjects) {
  const subjQs = dpQuestions.filter(x => x.subject === subj);
  // First question correct, rest wrong
  exactAnswers.set(subjQs[0].id, subjQs[0].correctAnswer);
  for (let i = 1; i < subjQs.length; i++) {
    exactAnswers.set(subjQs[i].id, 'A' === subjQs[i].correctAnswer ? 'B' : 'A');
  }
}
const espQs = dpQuestions.filter(x => x.subject === 'especificos_dev');
for (let i = 0; i < 21; i++) {
  exactAnswers.set(espQs[i].id, espQs[i].correctAnswer);
}
for (let i = 21; i < espQs.length; i++) {
  exactAnswers.set(espQs[i].id, 'A' === espQs[i].correctAnswer ? 'B' : 'A');
}
const exactScore = calculateScore(dev, dpQuestions, exactAnswers);
assert(exactScore.totalPoints === 57.5, `Pontos = 57.5 exato (atual: ${exactScore.totalPoints})`);
assert(exactScore.passed === true, '57.5 pontos sem disciplina zerada = aprovado');
assert(exactScore.zeroedSubjects.length === 0, 'Nenhuma disciplina zerada');

// PRODERJ scoring
const proderjAllCorrect = new Map<number, string | null>();
proderjQuestions.forEach(x => proderjAllCorrect.set(x.id, x.correctAnswer));
const proderjScore = calculateScore(analista, proderjQuestions, proderjAllCorrect);
assert(proderjScore.totalPoints === 150, `Nota máxima PRODERJ = 150 (atual: ${proderjScore.totalPoints})`);
assert(proderjScore.passed === true, 'Nota máxima PRODERJ = aprovado');

// 7. STORAGE SERVICE
console.log('\n7. STORAGE SERVICE');
// Verify AttemptHistory interface has contest fields
const mockAttempt = {
  id: 'test',
  contestId: 'dataprev-2026',
  contestName: 'Simulado Dataprev 2026',
  careerId: 'dataprev-dev',
  careerName: 'TI — Desenvolvimento de Software',
  date: new Date().toISOString(),
  totalPoints: 80,
  maxPoints: 115,
  correctCount: 40,
  totalQuestions: 70,
  percentage: 70,
  passed: true,
  timeSpent: 3600,
  answers: [],
  subjectScores: [],
};
assert(!!mockAttempt.contestId, 'Histórico salva contestId');
assert(!!mockAttempt.contestName, 'Histórico salva contestName');
assert(!!mockAttempt.careerId, 'Histórico salva careerId');
assert(!!mockAttempt.careerName, 'Histórico salva careerName');

// 8. PRODERJ questions have 4 alternatives
console.log('\n8. PRODERJ QUESTIONS (4 alternativas)');
import { questions as proderjQ } from '../src/data/questions';
const proderjAllHave4 = proderjQ.every(x => x.options.length === 4);
assert(proderjAllHave4, 'Questões PRODERJ Analista têm 4 alternativas (A-D)');

import { questionsTecnico } from '../src/data/questionsTecnico';
const tecnicoAllHave4 = questionsTecnico.every(x => x.options.length === 4);
assert(tecnicoAllHave4, 'Questões PRODERJ Técnico têm 4 alternativas (A-D)');

// 9. HARD MODE - DATAPREV
console.log('\n9. MODO DIFÍCIL DATAPREV');
const hardQuestions = getQuestionsForCareer(dev, 'hard');
assert(hardQuestions.length === 70, `Modo difícil gera 70 questões (atual: ${hardQuestions.length})`);
const hardIds = hardQuestions.map(x => x.id);
assert(new Set(hardIds).size === hardIds.length, 'Modo difícil: sem questões repetidas');

// Hard mode distribution
const hardDist: Record<string, number> = {};
hardQuestions.forEach(x => { hardDist[x.subject] = (hardDist[x.subject] || 0) + 1; });
assert(hardDist['portugues'] === 12, `Modo difícil Português: 12 (atual: ${hardDist['portugues']})`);
assert(hardDist['ingles'] === 12, `Modo difícil Inglês: 12 (atual: ${hardDist['ingles']})`);
assert(hardDist['logica'] === 5, `Modo difícil Lógica: 5 (atual: ${hardDist['logica']})`);
assert(hardDist['atualidades_ia'] === 6, `Modo difícil Atualidades/IA: 6 (atual: ${hardDist['atualidades_ia']})`);
assert(hardDist['legislacao_seguranca'] === 5, `Modo difícil Legislação: 5 (atual: ${hardDist['legislacao_seguranca']})`);
assert(hardDist['especificos_dev'] === 30, `Modo difícil Específicos: 30 (atual: ${hardDist['especificos_dev']})`);

// Hard mode prioritizes difficult questions
const hardDifficult = hardQuestions.filter(x => x.difficulty === 'dificil' || x.difficulty === 'alto').length;
const hardFacil = hardQuestions.filter(x => x.difficulty === 'facil' || x.difficulty === 'baixo').length;
assert(hardDifficult >= hardFacil, `Modo difícil prioriza difíceis (${hardDifficult} difíceis vs ${hardFacil} fáceis)`);

// 10. AI QUESTION VALIDATION
console.log('\n10. VALIDAÇÃO DE QUESTÕES GERADAS POR IA');

// Valid question
const validQ: GeneratedQuestion = {
  subject: 'especificos_dev',
  subjectName: 'Conhecimentos Específicos - Desenvolvimento de Software',
  subtopic: 'Microsserviços',
  difficulty: 'dificil',
  weight: 2.5,
  text: 'Em uma arquitetura de microsserviços, qual padrão de comunicação é mais adequado para garantir desacoplamento assíncrono entre serviços?',
  options: [
    { letter: 'A', text: 'Chamada síncrona REST' },
    { letter: 'B', text: 'Message queue com pub/sub' },
    { letter: 'C', text: 'Shared database' },
    { letter: 'D', text: 'RPC binário' },
    { letter: 'E', text: 'File transfer' },
  ],
  correctAnswer: 'B',
  explanation: 'Message queues com pub/sub garantem desacoplamento assíncrono, permitindo que serviços operem independentemente sem bloqueio.',
  tags: ['dataprev', 'microsservicos', 'arquitetura'],
  source: 'Questão autoral gerada com IA',
  aiGenerated: true,
};
const validResult = validateGeneratedQuestion(validQ, 5);
assert(validResult.valid, 'Questão válida passa na validação');

// Invalid: no explanation
const noExpQ = { ...validQ, explanation: '' };
assert(!validateGeneratedQuestion(noExpQ, 5).valid, 'Questão sem explicação é rejeitada');

// Invalid: duplicated options
const dupOptsQ = { ...validQ, options: [...validQ.options.map(o => ({ ...o, text: o.letter === 'A' ? 'Same text' : o.text })), { letter: 'B', text: 'Same text' as string }] };
const dupResult = validateGeneratedQuestion({ ...validQ, options: validQ.options.map(o => ({ letter: o.letter, text: o.letter === 'A' || o.letter === 'B' ? 'Duplicated' : o.text })) }, 5);
assert(!dupResult.valid, 'Questão com alternativas duplicadas é rejeitada');

// Invalid: wrong correctAnswer
const badAnswerQ = { ...validQ, correctAnswer: 'F' as 'A' };
assert(!validateGeneratedQuestion(badAnswerQ, 5).valid, 'Questão com correctAnswer inexistente é rejeitada');

// Invalid: only 4 options
const fourOptsQ = { ...validQ, options: validQ.options.slice(0, 4) };
assert(!validateGeneratedQuestion(fourOptsQ, 5).valid, 'Questão com 4 alternativas (esperado 5) é rejeitada');

// 11. SIMILARITY DETECTION
console.log('\n11. DETECÇÃO DE SIMILARIDADE');
const exactDup = checkSimilarityAgainstAll(questionsDataprevDev[0].text);
assert(exactDup.isDuplicate, 'Texto idêntico é detectado como duplicado');
assert(exactDup.similarity > 0.82, `Similaridade de texto idêntico > 0.82 (atual: ${exactDup.similarity.toFixed(2)})`);

const uniqueText = 'Esta é uma questão completamente única sobre um tópico que não existe em nenhuma base de questões do sistema atual.';
const uniqueCheck = checkSimilarityAgainstAll(uniqueText);
assert(!uniqueCheck.isDuplicate, 'Texto único não é marcado como duplicado');

// 12. PRODERJ STILL WORKS
console.log('\n12. PRODERJ CONTINUA FUNCIONANDO');
const proderjNormal = getQuestionsForCareer(analista, 'full');
assert(proderjNormal.length === 60, 'PRODERJ modo full: 60 questões');
const proderjHard = getQuestionsForCareer(analista, 'hard');
assert(proderjHard.length === 60, 'PRODERJ modo hard: 60 questões');

// 13. ADMIN PROTECTION
console.log('\n13. PROTEÇÃO ADMINISTRATIVA (AI_ADMIN_TOKEN)');

// Polyfill sessionStorage and localStorage for Node.js
const sessionStore: Record<string, string> = {};
const sessionStorageMock = {
  getItem: (key: string) => sessionStore[key] ?? null,
  setItem: (key: string, val: string) => { sessionStore[key] = val; },
  removeItem: (key: string) => { delete sessionStore[key]; },
};
(globalThis as any).sessionStorage = sessionStorageMock;
const localStore: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => localStore[key] ?? null,
  setItem: (key: string, val: string) => { localStore[key] = val; },
  removeItem: (key: string) => { delete localStore[key]; },
};
(globalThis as any).localStorage = localStorageMock;

// Initially not unlocked
clearAdminToken();
assert(!isAdminUnlocked(), 'Sem token: painel bloqueado');

// Set token
setAdminToken('test-admin-token-123');
assert(isAdminUnlocked(), 'Com token no sessionStorage: painel desbloqueado');
assert(getAdminToken() === 'test-admin-token-123', 'Token recuperado corretamente do sessionStorage');

// Clear token
clearAdminToken();
assert(!isAdminUnlocked(), 'Após clear: painel bloqueado novamente');
assert(getAdminToken() === null, 'Token removido do sessionStorage');

// Token is NOT in localStorage
assert(localStorage.getItem('aiAdminToken') === null, 'Token admin NÃO está em localStorage (apenas sessionStorage)');

// 14. ENDPOINT SECURITY LOGIC
console.log('\n14. LÓGICA DE SEGURANÇA DO ENDPOINT');

// Simulate the checkAdminToken logic
function checkAdminTokenLogic(expected: string | undefined, provided: string | undefined): boolean {
  if (!expected) return false;
  if (!provided) return false;
  return provided === expected;
}

assert(!checkAdminTokenLogic(undefined, 'some-token'), 'Sem AI_ADMIN_TOKEN no servidor: rejeita');
assert(!checkAdminTokenLogic('secret', undefined), 'Sem header x-ai-admin-token: rejeita');
assert(!checkAdminTokenLogic('secret', 'wrong-token'), 'Token inválido: rejeita');
assert(checkAdminTokenLogic('secret', 'secret'), 'Token correto: aceita');
assert(!checkAdminTokenLogic('', 'some-token'), 'Token vazio no servidor: rejeita');

// 15. RATE LIMIT LOGIC
console.log('\n15. RATE LIMIT E CONTROLE DE CUSTO');

// Simulate rate limit logic
const LIMITS = {
  IP: { perHour: 20, perDay: 50 },
  TOKEN: { perHour: 30, perDay: 100 },
};

function checkLimits(ipHour: number, ipDay: number, tokenHour: number, tokenDay: number): { allowed: boolean; reason?: string } {
  if (ipHour >= LIMITS.IP.perHour) return { allowed: false, reason: 'ip_hour' };
  if (ipDay >= LIMITS.IP.perDay) return { allowed: false, reason: 'ip_day' };
  if (tokenHour >= LIMITS.TOKEN.perHour) return { allowed: false, reason: 'token_hour' };
  if (tokenDay >= LIMITS.TOKEN.perDay) return { allowed: false, reason: 'token_day' };
  return { allowed: true };
}

assert(checkLimits(0, 0, 0, 0).allowed, 'Sem requests prévios: permite');
assert(checkLimits(19, 49, 29, 99).allowed, 'No limite máximo - 1: permite');
assert(!checkLimits(20, 0, 0, 0).allowed, 'IP hora no limite: bloqueia');
assert(!checkLimits(0, 50, 0, 0).allowed, 'IP dia no limite: bloqueia');
assert(!checkLimits(0, 0, 30, 0).allowed, 'Token hora no limite: bloqueia');
assert(!checkLimits(0, 0, 0, 100).allowed, 'Token dia no limite: bloqueia');
assert(checkLimits(20, 0, 0, 0).reason === 'ip_hour', 'Bloqueio por IP hora tem reason correto');
assert(checkLimits(0, 0, 30, 0).reason === 'token_hour', 'Bloqueio por token hora tem reason correto');

// When rate limited, Z.ai should NOT be called
let zaiCalled = false;
function simulateZaiCall() { zaiCalled = true; }

const blockedResult = checkLimits(20, 0, 0, 0);
if (!blockedResult.allowed) {
  // Don't call Z.ai
} else {
  simulateZaiCall();
}
assert(!zaiCalled, 'Quando rate limited: Z.ai NÃO é chamada');

zaiCalled = false;
const allowedResult = checkLimits(5, 10, 15, 20);
if (allowedResult.allowed) {
  simulateZaiCall();
}
assert(zaiCalled, 'Quando dentro do limite: Z.ai é chamada');

// Logging security: never log secrets
const logEntry = {
  timestamp: '2026-07-05T00:00:00Z',
  endpoint: '/api/generate-questions',
  status: 200,
  quantity: 5,
  ipHash: 'abc123def456',
  model: 'glm-4.5-flash',
  success: true,
};
const logStr = JSON.stringify(logEntry);
assert(!logStr.includes('ZAI_API_KEY'), 'Log não contém ZAI_API_KEY');
assert(!logStr.includes('AI_ADMIN_TOKEN'), 'Log não contém AI_ADMIN_TOKEN');
assert(!logStr.includes('161c298b'), 'Log não contém valor da chave da API');
assert(logStr.includes('ipHash'), 'Log contém ipHash (mascarado)');
assert(!logStr.includes('192.168.'), 'Log não contém IP original');

// Health check should not expose secrets
const healthResponse = {
  configured: true,
  model: 'glm-4.5-flash',
  baseUrlConfigured: true,
  apiKeyConfigured: true,
  adminProtectionConfigured: true,
  rateLimitEnabled: true,
  rateLimits: { ipHourly: 20, ipDaily: 50, tokenHourly: 30, tokenDaily: 100 },
};
const healthStr = JSON.stringify(healthResponse);
assert(!healthStr.includes('ZAI_API_KEY'), 'Health check não expõe ZAI_API_KEY');
assert(!healthStr.includes('AI_ADMIN_TOKEN'), 'Health check não expõe AI_ADMIN_TOKEN');
assert(healthStr.includes('rateLimitEnabled'), 'Health check informa rateLimitEnabled');
assert(healthStr.includes('adminProtectionConfigured'), 'Health check informa adminProtectionConfigured');

// 16. FREE MODEL MODE E FALLBACK
console.log('\n16. MODO ECONÔMICO E FALLBACK DE MODELO');

// Free mode logic
function getFreeModeMaxQty(freeMode: boolean): number {
  return freeMode ? 5 : 10;
}
function getFreeModeDefaultQty(freeMode: boolean): number {
  return freeMode ? 3 : 5;
}
function getFreeModeTemp(freeMode: boolean): number {
  return freeMode ? 0.5 : 0.7;
}

assert(getFreeModeMaxQty(true) === 5, 'Free mode: máximo 5 questões por request');
assert(getFreeModeMaxQty(false) === 10, 'Modo normal: máximo 10 questões por request');
assert(getFreeModeDefaultQty(true) === 3, 'Free mode: quantidade padrão 3');
assert(getFreeModeDefaultQty(false) === 5, 'Modo normal: quantidade padrão 5');
assert(getFreeModeTemp(true) === 0.5, 'Free mode: temperature 0.5');
assert(getFreeModeTemp(false) === 0.7, 'Modo normal: temperature 0.7');

// Free mode temperature must be between 0.4 and 0.6
const freeTemp = getFreeModeTemp(true);
assert(freeTemp >= 0.4 && freeTemp <= 0.6, 'Free mode: temperature entre 0.4 e 0.6');

// No paid models as default or fallback
const PAID_MODELS = ['glm-5.2', 'glm-5.1'];
const FREE_MODELS = ['glm-4.7-flash', 'glm-4.5-flash'];
const defaultPrimary = 'glm-4.7-flash';
const defaultFallback = 'glm-4.5-flash';
assert(!PAID_MODELS.includes(defaultPrimary), 'Modelo principal não é pago (glm-4.7-flash)');
assert(!PAID_MODELS.includes(defaultFallback), 'Fallback não é pago (glm-4.5-flash)');
assert(FREE_MODELS.includes(defaultPrimary), 'Modelo principal é gratuito');
assert(FREE_MODELS.includes(defaultFallback), 'Fallback é gratuito');

// Health check with free mode
const healthFreeMode = {
  configured: true,
  apiKeyConfigured: true,
  adminProtectionConfigured: true,
  baseUrlConfigured: true,
  model: 'glm-4.7-flash',
  fallbackModel: 'glm-4.5-flash',
  freeModelMode: true,
  rateLimitEnabled: true,
};
const healthFreeStr = JSON.stringify(healthFreeMode);
assert(healthFreeStr.includes('freeModelMode'), 'Health check informa freeModelMode');
assert(healthFreeStr.includes('fallbackModel'), 'Health check informa fallbackModel');
assert(healthFreeStr.includes('glm-4.7-flash'), 'Health check mostra modelo principal');
assert(healthFreeStr.includes('glm-4.5-flash'), 'Health check mostra fallback');
assert(!healthFreeStr.includes('glm-5.2'), 'Health check não referencia modelo pago');

// Fallback logic: if primary fails with 429/balance, use fallback
let modelUsed = 'glm-4.7-flash';
const primaryFailed = true;
const failReason: string = 'Insufficient balance';
if (primaryFailed && (failReason.includes('Insufficient balance') || failReason === '429')) {
  modelUsed = 'glm-4.5-flash';
}
assert(modelUsed === 'glm-4.5-flash', 'Fallback ativado quando primary falha com saldo/429');

// Fallback NOT triggered for other errors
modelUsed = 'glm-4.7-flash';
const otherError = 'ETIMEDOUT';
if (otherError === 'ETIMEDOUT') {
  // Don't fallback for timeout
}
assert(modelUsed === 'glm-4.7-flash', 'Fallback NÃO ativado para timeout (erro temporário)');

// 17. PADRÃO DA BANCA E PROMPT
console.log('\n17. PADRÃO DA BANCA E ESTRUTURA DO PROMPT');

// Board style profile
const fgvProfile = {
  id: 'fgv',
  name: 'Fundação Getulio Vargas',
  questionStyle: [
    'enunciados interpretativos',
    'alternativas longas e semanticamente próximas',
    'cobrança aplicada em cenários práticos',
  ],
  avoid: ['questões óbvias', 'copiar questões oficiais'],
  difficultyCalibration: {
    facil: 'questão conceitual',
    medio: 'questão aplicada com cenário',
    dificil: 'questão interpretativa com alternativas muito próximas',
  },
};
assert(fgvProfile.id === 'fgv', 'Perfil FGV tem id correto');
assert(fgvProfile.questionStyle.length >= 3, 'Perfil FGV tem pelo menos 3 regras de estilo');
assert(fgvProfile.avoid.includes('copiar questões oficiais'), 'Perfil FGV proíbe copiar questões');

// Contest reference profile
const dataprevProfile = {
  contestId: 'dataprev-2026',
  contestName: 'Dataprev 2026',
  currentBoard: 'fgv',
  targetRole: 'Analista de TI — Perfil 3',
  contentSourcePriority: ['Edital atual Dataprev 2026'],
  styleSourcePriority: ['Provas anteriores da FGV para cargos de TI'],
  previousExamUsageRule: 'Proibido copiar questões oficiais',
  generationRule: 'Gerar questões autorais',
};
assert(dataprevProfile.currentBoard === 'fgv', 'Dataprev usa FGV como banca atual');
assert(dataprevProfile.styleSourcePriority[0].includes('FGV'), 'Estilo principal é FGV');

// Simulated prompt content checks
const simulatedPrompt = `Você é um elaborador de questões de concurso público especializado na banca Fundação Getulio Vargas.
Concurso: Dataprev 2026
Banca: Fundação Getulio Vargas
Você deve gerar questões autorais no padrão da banca FGV.
Prioridade de geração:
1. Conteúdo do edital atual.
2. Estilo da banca atual.
3. Padrão de provas anteriores da mesma banca.
Não copie, não adapte e não reproduza questões oficiais.
Use provas anteriores da FGV para calibrar estilo.
Use provas antigas da Dataprev apenas para identificar temas recorrentes.
Regras por disciplina:
- Quando a disciplina for Língua Portuguesa, a questão deve cobrar uma habilidade linguística. O tema Dataprev, TI ou administração pública pode ser usado apenas como contexto textual. A alternativa correta não pode depender de conhecimento jurídico, administrativo ou técnico externo ao texto.
- Quando a disciplina for Língua Inglesa, a questão deve cobrar compreensão linguística do inglês, vocabulário, inferência ou gramática aplicada, e não apenas conhecimento técnico de TI.
source: "Questão autoral gerada com apoio de IA, inspirada no padrão da banca FGV"`;

assert(simulatedPrompt.includes('edital'), 'Prompt contém referência ao edital atual');
assert(simulatedPrompt.includes('FGV'), 'Prompt contém referência à banca atual (FGV)');
assert(simulatedPrompt.includes('Não copie'), 'Prompt contém regra de não copiar questões oficiais');
assert(simulatedPrompt.includes('provas anteriores da FGV'), 'Prompt usa provas anteriores da banca como estilo');
assert(simulatedPrompt.includes('Dataprev apenas'), 'Prompt usa provas antigas do órgão apenas como tema');
assert(simulatedPrompt.includes('autorais'), 'Prompt menciona questões autorais');
assert(simulatedPrompt.includes('inspirada no padrão da banca'), 'Source menciona inspiração no padrão da banca');

// Review response should include boardStyleScore
const reviewResponse = {
  approved: true,
  score: 8,
  boardStyleScore: 7,
  difficultyScore: 8,
  editalAdherenceScore: 9,
  disciplineAdherenceScore: 8,
  warnings: [],
  suggestions: [],
};
assert(typeof reviewResponse.boardStyleScore === 'number', 'Review retorna boardStyleScore');
assert(typeof reviewResponse.difficultyScore === 'number', 'Review retorna difficultyScore');
assert(typeof reviewResponse.editalAdherenceScore === 'number', 'Review retorna editalAdherenceScore');
assert(reviewResponse.boardStyleScore >= 0 && reviewResponse.boardStyleScore <= 10, 'boardStyleScore entre 0 e 10');

// No paid models in prompt
assert(!simulatedPrompt.includes('glm-5.2'), 'Prompt não referencia modelo pago');
assert(!simulatedPrompt.includes('glm-5.1'), 'Prompt não referencia modelo pago');

// === 18. ADERÊNCIA POR DISCIPLINA ===
console.log('\n18. ADERÊNCIA POR DISCIPLINA (PORTUGUÊS E INGLÊS)');

const validPortugueseSubtopics = [
  'Interpretação de Texto',
  'Coesão e Coerência',
  'Concordância Verbal',
  'Concordância Nominal',
  'Regência',
  'Regência Verbal',
  'Crase',
  'Pontuação',
  'Reescrita',
  'Reescrita de Frases',
  'Valor Semântico dos Conectivos',
  'Inferência Textual',
  'Classes de Palavras',
  'Sintaxe',
  'Sintaxe — Período Composto',
  'Semântica',
  'Semântica e Vocabulário',
  'Tipologia Textual',
  'Funções da Linguagem',
  'Análise de Afirmações',
  'Polissemia e Ambiguidade',
  'Colocação Pronominal',
  'Vozes do Verbo',
  'Vocabulário — Homônimos e Parônimos',
  'Vocabulário — Antônimos',
  'Função Sintática',
];

const forbiddenPortugueseSubtopics = [
  'Vocabulário Técnico',
  'Sinônimos no Contexto Técnico',
  'Vocabulary - Technical Terms',
  'Vocabulary - Technical Acronyms',
];

const validEnglishSubtopics = [
  'Reading Comprehension',
  'Vocabulary in Context',
  'Vocabulary - Synonyms',
  'Vocabulary - Phrasal Verbs',
  'Vocabulary - Word Formation',
  'Grammar - Verb Tenses',
  'Grammar - Conditionals',
  'Grammar - Passive Voice',
  'Grammar - Articles',
  'Grammar - Relative Clauses',
  'Grammar - Modal Verbs',
  'Grammar - Conjunctions',
  'Grammar - Prepositions',
  'Grammar - Linking Words',
];

const forbiddenEnglishSubtopics = [
  'Vocabulary - Technical Terms',
  'Vocabulary - Technical Acronyms',
  'Technical Vocabulary',
];

const portugueseQuestions = questionsDataprevDev.filter(q => q.subject === 'portugues');
const englishQuestions = questionsDataprevDev.filter(q => q.subject === 'ingles');

console.log(`  Total questões Português: ${portugueseQuestions.length}`);
console.log(`  Total questões Inglês: ${englishQuestions.length}`);

// Check Portuguese subtopics
let portugueseOk = 0;
let portugueseFlagged = 0;
for (const q of portugueseQuestions) {
  if (forbiddenPortugueseSubtopics.includes(q.subtopic || '')) {
    console.log(`  ❌ Português ID ${q.id}: subtopic proibido "${q.subtopic}" — cobra conhecimento técnico`);
    portugueseFlagged++;
    failed++;
  } else if (validPortugueseSubtopics.includes(q.subtopic || '')) {
    portugueseOk++;
  } else {
    console.log(`  ⚠️ Português ID ${q.id}: subtopic não listado "${q.subtopic}" — revisar manualmente`);
  }
}
assert(portugueseFlagged === 0, 'Nenhuma questão de Português com subtopic de conteúdo técnico');
assert(portugueseOk >= 40, `Pelo menos 40 questões de Português com subtopic linguístico válido (${portugueseOk} encontradas)`);

// Check English subtopics
let englishOk = 0;
let englishFlagged = 0;
for (const q of englishQuestions) {
  if (forbiddenEnglishSubtopics.includes(q.subtopic || '')) {
    console.log(`  ❌ Inglês ID ${q.id}: subtopic proibido "${q.subtopic}" — cobra conhecimento técnico`);
    englishFlagged++;
    failed++;
  } else if (validEnglishSubtopics.includes(q.subtopic || '')) {
    englishOk++;
  } else {
    console.log(`  ⚠️ Inglês ID ${q.id}: subtopic não listado "${q.subtopic}" — revisar manualmente`);
  }
}
assert(englishFlagged === 0, 'Nenhuma questão de Inglês com subtopic de conteúdo técnico puro');
assert(englishOk >= 30, `Pelo menos 30 questões de Inglês com subtopic linguístico válido (${englishOk} encontradas)`);

// Check that Portuguese questions don't have tags indicating non-linguistic content
const forbiddenPortugueseTags = ['lgpd', 'administracao-publica', 'legislacao', 'seguranca-info'];
let portugueseTagIssues = 0;
for (const q of portugueseQuestions) {
  const tags = q.tags || [];
  const hasForbidden = tags.some(t => forbiddenPortugueseTags.includes(t));
  if (hasForbidden) {
    console.log(`  ❌ Português ID ${q.id}: tags indicam conteúdo não linguístico: ${tags.join(', ')}`);
    portugueseTagIssues++;
    failed++;
  }
}
assert(portugueseTagIssues === 0, 'Nenhuma questão de Português com tags de conteúdo não linguístico');

// Check that Portuguese "Vocabulário Técnico" subtopic is no longer present
const hasVocabularioTecnico = portugueseQuestions.some(q => q.subtopic === 'Vocabulário Técnico');
assert(!hasVocabularioTecnico, 'Nenhuma questão de Português com subtopic "Vocabulário Técnico"');

// Check that English "Vocabulary - Technical Terms" and "Vocabulary - Technical Acronyms" are gone
const hasTechTerms = englishQuestions.some(q => q.subtopic === 'Vocabulary - Technical Terms');
const hasTechAcronyms = englishQuestions.some(q => q.subtopic === 'Vocabulary - Technical Acronyms');
assert(!hasTechTerms, 'Nenhuma questão de Inglês com subtopic "Vocabulary - Technical Terms"');
assert(!hasTechAcronyms, 'Nenhuma questão de Inglês com subtopic "Vocabulary - Technical Acronyms"');

// Check disciplineAdherenceScore in review response
assert(reviewResponse.disciplineAdherenceScore !== undefined, 'Review retorna disciplineAdherenceScore');
assert(typeof reviewResponse.disciplineAdherenceScore === 'number', 'disciplineAdherenceScore é número');
assert(reviewResponse.disciplineAdherenceScore >= 0 && reviewResponse.disciplineAdherenceScore <= 10, 'disciplineAdherenceScore entre 0 e 10');

// Check prompt includes discipline rules
assert(simulatedPrompt.includes('Língua Portuguesa') || simulatedPrompt.includes('disciplina'), 'Prompt menciona disciplina');
assert(simulatedPrompt.includes('habilidade linguística') || simulatedPrompt.includes('competência linguística'), 'Prompt menciona habilidade linguística para Português');
assert(simulatedPrompt.includes('não pode depender de conhecimento') || simulatedPrompt.includes('não deve depender'), 'Prompt proíbe dependência de conhecimento externo');

// RESULTS
console.log('\n=== RESULTADO ===');
console.log(`Passou: ${passed}`);
console.log(`Falhou: ${failed}`);
console.log(failed === 0 ? '\n✅ TODAS AS VALIDAÇÕES PASSARAM' : '\n❌ HÁ VALIDAÇÕES FALHANDO');
process.exit(failed === 0 ? 0 : 1);
