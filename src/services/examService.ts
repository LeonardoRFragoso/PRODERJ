import type { Question } from '../types/question';
import type { Career } from '../types/career';
import { questions as questionsProderjAnalista, subjects as subjectsAnalista } from '../data/questions';
import { questionsTecnico } from '../data/questionsTecnico';
import { questionsDataprevDev } from '../data/questionsDataprevDev';

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const selectRandomQuestions = (pool: Question[], count: number): Question[] => {
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, count);
};

export const getQuestionsForCareer = (career: Career): Question[] => {
  if (career.contestId === 'proderj-2026') {
    if (career.id === 'analista') {
      const portugues = selectRandomQuestions(questionsProderjAnalista.filter(q => q.subject === 'portugues'), 10);
      const logica = selectRandomQuestions(questionsProderjAnalista.filter(q => q.subject === 'logica'), 10);
      const direito = selectRandomQuestions(questionsProderjAnalista.filter(q => q.subject === 'direito'), 10);
      const especificos = selectRandomQuestions(questionsProderjAnalista.filter(q => q.subject === 'especificos_analista'), 30);
      return [
        ...shuffleArray(portugues),
        ...shuffleArray(logica),
        ...shuffleArray(direito),
        ...shuffleArray(especificos),
      ];
    } else if (career.id === 'tecnico') {
      const portuguesTecnico = selectRandomQuestions(questionsTecnico.filter(q => q.subject === 'portugues'), 10);
      const logicaTecnico = selectRandomQuestions(questionsTecnico.filter(q => q.subject === 'logica'), 10);
      const direitoTecnico = selectRandomQuestions(questionsTecnico.filter(q => q.subject === 'direito'), 10);
      const especificosTecnico = selectRandomQuestions(questionsTecnico.filter(q => q.subject === 'especificos_tecnico'), 30);
      return [
        ...shuffleArray(portuguesTecnico),
        ...shuffleArray(logicaTecnico),
        ...shuffleArray(direitoTecnico),
        ...shuffleArray(especificosTecnico),
      ];
    }
  }

  if (career.contestId === 'dataprev-2026' && career.id === 'dataprev-dev') {
    const examQuestions: Question[] = [];
    for (const subject of career.subjects) {
      const pool = questionsDataprevDev.filter(q => q.subject === subject.id);
      const needed = subject.questionCount;
      const selected = pool.length >= needed ? selectRandomQuestions(pool, needed) : pool;
      examQuestions.push(...shuffleArray(selected));
    }
    return examQuestions;
  }

  return [];
};

export const getQuestionById = (contestId: string, questionId: number): Question | undefined => {
  if (contestId === 'dataprev-2026') {
    return questionsDataprevDev.find(q => q.id === questionId);
  }
  return questionsProderjAnalista.find(q => q.id === questionId) || questionsTecnico.find(q => q.id === questionId);
};

export { subjectsAnalista };
