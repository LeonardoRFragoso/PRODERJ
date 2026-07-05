import type { Difficulty } from './question';

export interface GeneratedQuestion {
  id?: number;
  subject: string;
  subjectName: string;
  subtopic: string;
  difficulty: Difficulty;
  weight: number;
  text: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  tags: string[];
  source: string;
  aiGenerated: true;
  reviewed?: boolean;
  approvedAt?: string;
  rejectedAt?: string;
  generationMetadata?: {
    provider: 'zai';
    model: string;
    generatedAt: string;
    contestId: string;
    careerId: string;
    promptVersion: string;
  };
}

export type GeneratedQuestionStatus = 'draft' | 'approved' | 'rejected';

export interface GeneratedQuestionWithStatus extends GeneratedQuestion {
  status: GeneratedQuestionStatus;
  localId: string;
}
