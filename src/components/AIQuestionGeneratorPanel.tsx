import { useState, useEffect, useCallback } from 'react';
import type { Career } from '../types/career';
import type { GeneratedQuestionWithStatus } from '../types/generatedQuestion';
import type { GenerateQuestionsRequest } from '../types/aiGeneration';
import {
  callGenerateApi,
  validateGeneratedQuestions,
  normalizeGeneratedQuestion,
  checkSimilarityAgainstAll,
  getDrafts,
  getApproved,
  getRejected,
  addDrafts,
  setAdminToken,
  clearAdminToken,
  isAdminUnlocked,
} from '../services/aiQuestionService';
import GeneratedQuestionsReview from './GeneratedQuestionsReview';
import WeakTopicsPanel from './WeakTopicsPanel';
import type { AttemptHistory } from '../services/storageService';
import { getContestReferenceProfile } from '../data/contestReferenceProfiles';
import { getBoardProfile } from '../data/boardStyleProfiles';

interface AIQuestionGeneratorPanelProps {
  career: Career;
  contestId: string;
  history: AttemptHistory[];
}

export default function AIQuestionGeneratorPanel({ career, contestId, history }: AIQuestionGeneratorPanelProps) {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked());
  const [tokenInput, setTokenInput] = useState('');
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState(career.subjects[0]?.id || '');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'medio' | 'dificil'>('dificil');
  const [quantity, setQuantity] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<GeneratedQuestionWithStatus[]>([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const contestProfile = getContestReferenceProfile(contestId);
  const boardProfile = contestProfile ? getBoardProfile(contestProfile.currentBoard) : undefined;
  const maxQty = 5;

  const refreshData = useCallback(() => {
    setDrafts(getDrafts());
    setApprovedCount(getApproved().length);
    setRejectedCount(getRejected().length);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const subject = career.subjects.find(s => s.id === selectedSubject);

  const handleUnlock = () => {
    if (!tokenInput.trim()) {
      setUnlockError('Digite o token administrativo.');
      return;
    }
    setAdminToken(tokenInput.trim());
    setUnlocked(true);
    setTokenInput('');
    setUnlockError(null);
  };

  const handleLock = () => {
    clearAdminToken();
    setUnlocked(false);
  };

  const handleGenerate = async (weakTopics?: string[]) => {
    if (!subject) return;
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const request: GenerateQuestionsRequest = {
        contestId,
        careerId: career.id,
        subject: subject.id,
        subjectName: subject.name,
        topic: topic || subject.name,
        difficulty,
        quantity: Math.min(quantity, maxQty),
        mode: weakTopics ? 'weak-topics' : 'hard',
        weakTopics,
      };

      const response = await callGenerateApi(request);

      if (response.questions.length === 0) {
        setError('A IA não retornou questões.');
        setLoading(false);
        return;
      }

      const validation = validateGeneratedQuestions(response.questions, 5);
      const normalized = validation.valid.map(q => normalizeGeneratedQuestion(q, contestId, career.id));

      const withSimilarityCheck = normalized.map(q => {
        const sim = checkSimilarityAgainstAll(q.text, 0.82);
        if (sim.isDuplicate) {
          q.source = `${q.source} [ATENÇÃO: Possível duplicada detectada]`;
        }
        return q;
      });

      addDrafts(withSimilarityCheck);
      refreshData();

      const warnings = [
        ...validation.invalid.map(i => `Questão rejeitada: ${i.errors.join(', ')}`),
      ];
      if (warnings.length > 0) {
        setSuccessMsg(`${withSimilarityCheck.length} questões geradas. ${warnings.length} rejeitadas na validação.`);
      } else {
        setSuccessMsg(`${withSimilarityCheck.length} questões geradas com sucesso! Revise e aprove.`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao gerar questões';
      if (msg.includes('Unauthorized') || msg.includes('token administrativo')) {
        setUnlocked(false);
        clearAdminToken();
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="ai-generator-panel">
        <div className="ai-panel-header-section">
          <h2>🔒 Área Administrativa de Geração de Questões</h2>
          <p>Esta área é restrita. Insira o token administrativo para continuar.</p>
        </div>
        <div className="ai-unlock-form">
          <div className="form-row">
            <label>
              Token Administrativo
              <input
                type="password"
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                placeholder="Token de acesso"
                autoComplete="off"
              />
            </label>
          </div>
          {unlockError && <div className="ai-error">{unlockError}</div>}
          <button className="nav-btn primary" onClick={handleUnlock}>🔓 Desbloquear Geração</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-generator-panel">
      <div className="ai-panel-header-section">
        <h2>🤖 Geração Assistida de Questões com IA</h2>
        <p>Gere novas questões difíceis usando IA. As questões entram como rascunho e precisam ser revisadas antes do uso.</p>
        <button className="nav-btn secondary small-btn" onClick={handleLock}>🔒 Bloquear</button>
      </div>

      {contestProfile && boardProfile && (
        <div className="ai-panel-contest-info">
          <div className="ai-contest-info-row">
            <span className="ai-info-label">Concurso:</span> <strong>{contestProfile.contestName}</strong>
          </div>
          <div className="ai-contest-info-row">
            <span className="ai-info-label">Banca:</span> <strong>{boardProfile.name}</strong>
          </div>
          <div className="ai-contest-info-row">
            <span className="ai-info-label">Estilo:</span> <span>{boardProfile.questionStyle.slice(0, 3).join(', ')}</span>
          </div>
          <div className="ai-contest-info-row">
            <span className="ai-info-label">Cargo:</span> <span>{contestProfile.targetRole}</span>
          </div>
        </div>
      )}

      <div className="ai-panel-stats">
        <div className="ai-stat"><span className="ai-stat-value">{drafts.length}</span><span className="ai-stat-label">Rascunhos</span></div>
        <div className="ai-stat"><span className="ai-stat-value">{approvedCount}</span><span className="ai-stat-label">Aprovadas</span></div>
        <div className="ai-stat"><span className="ai-stat-value">{rejectedCount}</span><span className="ai-stat-label">Rejeitadas</span></div>
      </div>

      <div className="ai-panel-form">
        <div className="form-row">
          <label>
            Disciplina
            <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
              {career.subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Tópico (opcional)
            <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Ex: Microsserviços e API Gateway" />
          </label>
        </div>
        <div className="form-row-inline">
          <label>
            Dificuldade
            <select value={difficulty} onChange={e => setDifficulty(e.target.value as 'medio' | 'dificil')}>
              <option value="dificil">Difícil</option>
              <option value="medio">Médio</option>
            </select>
          </label>
          <label>
            Quantidade (máx {maxQty})
            <input type="number" min={1} max={maxQty} value={quantity} onChange={e => setQuantity(Math.min(parseInt(e.target.value) || 1, maxQty))} />
          </label>
        </div>
        <button className="nav-btn primary" onClick={() => handleGenerate()} disabled={loading}>
          {loading ? '⏳ Gerando...' : '🤖 Gerar questões com IA'}
        </button>
      </div>

      {error && <div className="ai-error">{error}</div>}
      {successMsg && <div className="ai-success">{successMsg}</div>}

      <GeneratedQuestionsReview drafts={drafts} onRefresh={refreshData} />

      <WeakTopicsPanel history={history} onGenerate={(topics) => handleGenerate(topics)} />
    </div>
  );
}
