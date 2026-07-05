import type { GeneratedQuestion, GeneratedQuestionWithStatus } from '../types/generatedQuestion';
import type { GenerateQuestionsRequest, GenerateQuestionsResponse } from '../types/aiGeneration';
import type { Question } from '../types/question';
import { questionsDataprevDev } from '../data/questionsDataprevDev';

const STORAGE_KEYS = {
  drafts: 'generatedQuestionsDrafts',
  approved: 'generatedQuestionsApproved',
  rejected: 'generatedQuestionsRejected',
} as const;

const generateLocalId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// === API CALL ===

export async function callGenerateApi(request: GenerateQuestionsRequest): Promise<GenerateQuestionsResponse> {
  const response = await fetch('/api/generate-questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Erro ao gerar questões');
  }

  return data as GenerateQuestionsResponse;
}

// === VALIDATION ===

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateGeneratedQuestion(q: GeneratedQuestion, expectedOptionsCount: number = 5): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!q.subject || q.subject.trim().length === 0) errors.push('subject vazio');
  if (!q.subjectName || q.subjectName.trim().length === 0) errors.push('subjectName vazio');
  if (!q.subtopic || q.subtopic.trim().length === 0) errors.push('subtopic vazio');
  if (!q.difficulty || !['facil', 'medio', 'dificil', 'baixo', 'alto'].includes(q.difficulty)) {
    errors.push('difficulty inválido');
  }
  if (typeof q.weight !== 'number' || q.weight <= 0) errors.push('weight inválido');
  if (!q.text || q.text.trim().length < 20) errors.push('text muito curto (mínimo 20 chars)');

  if (!q.options || !Array.isArray(q.options)) {
    errors.push('options ausente');
  } else {
    if (q.options.length !== expectedOptionsCount) {
      errors.push(`options deve ter ${expectedOptionsCount} alternativas, tem ${q.options.length}`);
    }
    const expectedLetters = expectedOptionsCount === 5
      ? ['A', 'B', 'C', 'D', 'E']
      : ['A', 'B', 'C', 'D'];
    const actualLetters = q.options.map(o => o.letter).sort();
    if (JSON.stringify(actualLetters) !== JSON.stringify(expectedLetters)) {
      errors.push(`alternativas devem ser ${expectedLetters.join(', ')}`);
    }
    for (const opt of q.options) {
      if (!opt.text || opt.text.trim().length < 2) {
        errors.push(`alternativa ${opt.letter} com texto vazio`);
      }
    }
    const optionTexts = q.options.map(o => o.text.trim().toLowerCase());
    const uniqueTexts = new Set(optionTexts);
    if (uniqueTexts.size !== optionTexts.length) {
      errors.push('alternativas duplicadas');
    }
  }

  if (!q.correctAnswer || !q.options?.some(o => o.letter === q.correctAnswer)) {
    errors.push('correctAnswer não existe nas alternativas');
  }

  if (!q.explanation || q.explanation.trim().length < 20) {
    errors.push('explanation muito curta (mínimo 20 chars)');
  }

  if (!q.tags || !Array.isArray(q.tags) || q.tags.length === 0) {
    errors.push('tags vazio');
  }

  if (!q.source || q.source.trim().length === 0) {
    errors.push('source vazio');
  }

  if (q.text && q.text.trim().length < 50) {
    warnings.push('text pode ser muito genérico');
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateGeneratedQuestions(questions: GeneratedQuestion[], expectedOptionsCount: number = 5): {
  valid: GeneratedQuestion[];
  invalid: { question: GeneratedQuestion; errors: string[]; warnings: string[] }[];
} {
  const valid: GeneratedQuestion[] = [];
  const invalid: { question: GeneratedQuestion; errors: string[]; warnings: string[] }[] = [];

  for (const q of questions) {
    const result = validateGeneratedQuestion(q, expectedOptionsCount);
    if (result.valid) {
      valid.push(q);
    } else {
      invalid.push({ question: q, errors: result.errors, warnings: result.warnings });
    }
  }

  return { valid, invalid };
}

// === SIMILARITY DETECTION ===

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): Set<string> {
  return new Set(normalizeText(text).split(' ').filter(t => t.length > 2));
}

function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return intersection / union;
}

export function checkSimilarity(
  newText: string,
  existingQuestions: Question[],
  threshold: number = 0.82
): { isDuplicate: boolean; similarity: number; similarQuestionId?: number } {
  const newTokens = tokenize(newText);
  let maxSim = 0;
  let similarId: number | undefined;

  for (const eq of existingQuestions) {
    const eqTokens = tokenize(eq.text);
    const sim = jaccardSimilarity(newTokens, eqTokens);
    if (sim > maxSim) {
      maxSim = sim;
      similarId = eq.id;
    }
  }

  return {
    isDuplicate: maxSim > threshold,
    similarity: maxSim,
    similarQuestionId: similarId,
  };
}

export function checkSimilarityAgainstAll(
  newText: string,
  threshold: number = 0.82
): { isDuplicate: boolean; similarity: number; similarQuestionId?: number } {
  return checkSimilarity(newText, questionsDataprevDev, threshold);
}

// === NORMALIZATION ===

export function normalizeGeneratedQuestion(
  q: GeneratedQuestion,
  contestId: string,
  careerId: string
): GeneratedQuestionWithStatus {
  return {
    ...q,
    localId: generateLocalId(),
    status: 'draft',
    aiGenerated: true,
    generationMetadata: q.generationMetadata || {
      provider: 'zai',
      model: 'glm-5.2',
      generatedAt: new Date().toISOString(),
      contestId,
      careerId,
      promptVersion: '1.0.0',
    },
  };
}

// === LOCAL STORAGE ===

function loadFromStorage<T extends GeneratedQuestionWithStatus>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage<T extends GeneratedQuestionWithStatus>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}

export function getDrafts(): GeneratedQuestionWithStatus[] {
  return loadFromStorage(STORAGE_KEYS.drafts);
}

export function getApproved(): GeneratedQuestionWithStatus[] {
  return loadFromStorage(STORAGE_KEYS.approved);
}

export function getRejected(): GeneratedQuestionWithStatus[] {
  return loadFromStorage(STORAGE_KEYS.rejected);
}

export function saveDrafts(questions: GeneratedQuestionWithStatus[]): void {
  saveToStorage(STORAGE_KEYS.drafts, questions);
}

export function saveApproved(questions: GeneratedQuestionWithStatus[]): void {
  saveToStorage(STORAGE_KEYS.approved, questions);
}

export function saveRejected(questions: GeneratedQuestionWithStatus[]): void {
  saveToStorage(STORAGE_KEYS.rejected, questions);
}

export function addDrafts(questions: GeneratedQuestionWithStatus[]): void {
  const existing = getDrafts();
  saveDrafts([...existing, ...questions]);
}

export function approveGeneratedQuestion(localId: string): void {
  const drafts = getDrafts();
  const approved = getApproved();
  const question = drafts.find(q => q.localId === localId);
  if (question) {
    question.status = 'approved';
    question.reviewed = true;
    question.approvedAt = new Date().toISOString();
    saveDrafts(drafts.filter(q => q.localId !== localId));
    saveApproved([...approved, question]);
  }
}

export function rejectGeneratedQuestion(localId: string): void {
  const drafts = getDrafts();
  const rejected = getRejected();
  const question = drafts.find(q => q.localId === localId);
  if (question) {
    question.status = 'rejected';
    question.reviewed = true;
    question.rejectedAt = new Date().toISOString();
    saveDrafts(drafts.filter(q => q.localId !== localId));
    saveRejected([...rejected, question]);
  }
}

export function removeApproved(localId: string): void {
  const approved = getApproved();
  saveApproved(approved.filter(q => q.localId !== localId));
}

export function clearAllGenerated(): void {
  localStorage.removeItem(STORAGE_KEYS.drafts);
  localStorage.removeItem(STORAGE_KEYS.approved);
  localStorage.removeItem(STORAGE_KEYS.rejected);
}

// === CONVERT TO QUESTION ===

export function generatedToQuestion(gq: GeneratedQuestionWithStatus, id: number): Question {
  return {
    id,
    subject: gq.subject,
    subjectName: gq.subjectName,
    subtopic: gq.subtopic,
    difficulty: gq.difficulty,
    weight: gq.weight,
    text: gq.text,
    options: gq.options.map(o => ({ letter: o.letter, text: o.text })),
    correctAnswer: gq.correctAnswer,
    explanation: gq.explanation,
    tags: gq.tags,
    source: gq.source,
  };
}

export function getApprovedAsQuestions(contestId: string, careerId: string): Question[] {
  const approved = getApproved();
  const filtered = approved.filter(
    q => q.generationMetadata?.contestId === contestId && q.generationMetadata?.careerId === careerId
  );
  return filtered.map((gq, i) => generatedToQuestion(gq, 100000 + i));
}
