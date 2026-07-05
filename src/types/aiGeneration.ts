export interface GenerateQuestionsRequest {
  contestId: string;
  careerId: string;
  subject: string;
  subjectName: string;
  topic: string;
  difficulty: 'medio' | 'dificil';
  quantity: number;
  mode: 'hard' | 'weak-topics' | 'custom';
  weakTopics?: string[];
}

export interface GenerateQuestionsResponse {
  success: boolean;
  questions: import('../types/generatedQuestion').GeneratedQuestion[];
  errors?: string[];
  warnings?: string[];
  metadata: {
    provider: 'zai';
    model: string;
    generatedAt: string;
    count: number;
  };
}

export interface HealthZaiResponse {
  configured: boolean;
  model: string;
  baseUrlConfigured: boolean;
  apiKeyConfigured: boolean;
}
