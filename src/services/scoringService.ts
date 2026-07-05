import type { Question } from '../types/question';
import type { Career, CareerSubject } from '../types/career';
import { getCareerTotalPoints, getCareerPassingScore } from '../data/contests';

export interface SubjectScore {
  subject: CareerSubject;
  correct: number;
  total: number;
  points: number;
  maxPoints: number;
}

export interface ScoringResult {
  totalPoints: number;
  maxPoints: number;
  correctCount: number;
  wrongCount: number;
  blankCount: number;
  subjectScores: SubjectScore[];
  passed: boolean;
  zeroedSubjects: string[];
  passingScore: number;
}

export const calculateScore = (
  career: Career,
  questions: Question[],
  answers: Map<number, string | null>
): ScoringResult => {
  const subjectScores: SubjectScore[] = career.subjects.map(subject => {
    const subjectQuestions = questions.filter(q => q.subject === subject.id);
    const correct = subjectQuestions.filter(q => {
      const selected = answers.get(q.id);
      return selected !== null && selected !== undefined && selected === q.correctAnswer;
    }).length;
    const points = correct * subject.weight;
    return {
      subject,
      correct,
      total: subjectQuestions.length,
      points,
      maxPoints: subject.maxPoints,
    };
  });

  const totalPoints = subjectScores.reduce((sum, s) => sum + s.points, 0);
  const maxPoints = getCareerTotalPoints(career);
  const passingScore = getCareerPassingScore(career);

  const correctCount = questions.filter(q => {
    const selected = answers.get(q.id);
    return selected !== null && selected !== undefined && selected === q.correctAnswer;
  }).length;

  const answeredCount = questions.filter(q => {
    const selected = answers.get(q.id);
    return selected !== null && selected !== undefined;
  }).length;

  const wrongCount = answeredCount - correctCount;
  const blankCount = questions.length - answeredCount;

  const zeroedSubjects = subjectScores
    .filter(s => s.correct === 0 && s.total > 0)
    .map(s => s.subject.name);

  let passed = totalPoints >= passingScore;
  if (career.requireNoZeroedSubject && zeroedSubjects.length > 0) {
    passed = false;
  }

  return {
    totalPoints,
    maxPoints,
    correctCount,
    wrongCount,
    blankCount,
    subjectScores,
    passed,
    zeroedSubjects,
    passingScore,
  };
};
