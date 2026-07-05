export type Difficulty = 'baixo' | 'medio' | 'alto' | 'facil' | 'dificil';

export interface QuestionOption {
  letter: string;
  text: string;
}

export interface Question {
  id: number;
  subject: string;
  subjectName: string;
  subtopic?: string;
  difficulty?: Difficulty;
  weight: number;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation?: string;
  tags?: string[];
  source?: string;
}
