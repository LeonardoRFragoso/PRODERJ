export interface Answer {
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  questionText: string;
  subjectId: string;
  subjectName: string;
}

export interface SubjectScoreHistory {
  subjectId: string;
  subjectName: string;
  correct: number;
  total: number;
  points: number;
  maxPoints: number;
}

export interface AttemptHistory {
  id: string;
  contestId: string;
  contestName: string;
  careerId: string;
  careerName: string;
  date: string;
  totalPoints: number;
  maxPoints: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpent: number;
  answers: Answer[];
  subjectScores: SubjectScoreHistory[];
}

export interface ActiveQuizState {
  contestId: string;
  careerId: string;
  currentQuestionIndex: number;
  answers: Answer[];
  shuffledQuestionIds: number[];
  timeLeft: number;
  startTime: number;
}

const HISTORY_KEY = 'proderj_quiz_history';
const ACTIVE_QUIZ_KEY = 'proderj_active_quiz';

export const loadHistory = (): AttemptHistory[] => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (history: AttemptHistory[]): void => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const saveActiveQuiz = (state: ActiveQuizState): void => {
  localStorage.setItem(ACTIVE_QUIZ_KEY, JSON.stringify(state));
};

export const loadActiveQuiz = (): ActiveQuizState | null => {
  try {
    const data = localStorage.getItem(ACTIVE_QUIZ_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const clearActiveQuiz = (): void => {
  localStorage.removeItem(ACTIVE_QUIZ_KEY);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
