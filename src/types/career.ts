export interface CareerSubject {
  id: string;
  name: string;
  questionCount: number;
  weight: number;
  maxPoints: number;
}

export interface Career {
  id: string;
  contestId: string;
  name: string;
  shortName: string;
  level: 'medio' | 'tecnico' | 'superior';
  totalQuestions: number;
  duration: number;
  salary: string;
  description: string;
  subjects: CareerSubject[];
  passingScore?: number;
  requireNoZeroedSubject?: boolean;
}
