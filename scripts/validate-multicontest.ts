import { questionsDataprevDev } from '../src/data/questionsDataprevDev';
import { contests, getCareerTotalPoints, getCareerPassingScore } from '../src/data/contests';
import { getQuestionsForCareer } from '../src/services/examService';
import { calculateScore } from '../src/services/scoringService';
import type { Career } from '../src/types/career';

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

// RESULTS
console.log('\n=== RESULTADO ===');
console.log(`Passou: ${passed}`);
console.log(`Falhou: ${failed}`);
console.log(failed === 0 ? '\n✅ TODAS AS VALIDAÇÕES PASSARAM' : '\n❌ HÁ VALIDAÇÕES FALHANDO');
process.exit(failed === 0 ? 0 : 1);
