import { useState } from 'react';
import type { GeneratedQuestionWithStatus } from '../types/generatedQuestion';
import { approveGeneratedQuestion, rejectGeneratedQuestion } from '../services/aiQuestionService';

interface GeneratedQuestionsReviewProps {
  drafts: GeneratedQuestionWithStatus[];
  onRefresh: () => void;
}

export default function GeneratedQuestionsReview({ drafts, onRefresh }: GeneratedQuestionsReviewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleApprove = (localId: string) => {
    approveGeneratedQuestion(localId);
    onRefresh();
  };

  const handleReject = (localId: string) => {
    rejectGeneratedQuestion(localId);
    onRefresh();
  };

  const handleCopyJson = (q: GeneratedQuestionWithStatus) => {
    const json = JSON.stringify(q, null, 2);
    navigator.clipboard.writeText(json);
  };

  const handleExportAll = () => {
    const json = JSON.stringify(drafts, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drafts-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (drafts.length === 0) {
    return (
      <div className="ai-panel-section">
        <h3>📋 Rascunhos para Revisão</h3>
        <p className="empty-state">Nenhuma questão aguardando revisão.</p>
      </div>
    );
  }

  return (
    <div className="ai-panel-section">
      <div className="ai-panel-header">
        <h3>📋 Rascunhos para Revisão ({drafts.length})</h3>
        <button className="nav-btn secondary small-btn" onClick={handleExportAll}>📥 Exportar JSON</button>
      </div>
      <div className="drafts-list">
        {drafts.map(q => (
          <div key={q.localId} className="draft-item">
            <div className="draft-header" onClick={() => setExpandedId(expandedId === q.localId ? null : q.localId)}>
              <span className="draft-subject">{q.subjectName}</span>
              <span className="draft-difficulty">{q.difficulty}</span>
              <span className="draft-toggle">{expandedId === q.localId ? '▼' : '▶'}</span>
            </div>
            {expandedId === q.localId && (
              <div className="draft-detail">
                <p className="draft-text">{q.text}</p>
                <div className="draft-options">
                  {q.options.map(o => (
                    <div key={o.letter} className={`draft-option ${o.letter === q.correctAnswer ? 'correct' : ''}`}>
                      <strong>{o.letter})</strong> {o.text}
                      {o.letter === q.correctAnswer && ' ✓'}
                    </div>
                  ))}
                </div>
                <div className="draft-explanation">
                  <strong>Explicação:</strong> {q.explanation}
                </div>
                <div className="draft-actions">
                  <button className="nav-btn success small-btn" onClick={() => handleApprove(q.localId)}>✓ Aprovar</button>
                  <button className="nav-btn danger small-btn" onClick={() => handleReject(q.localId)}>✗ Rejeitar</button>
                  <button className="nav-btn secondary small-btn" onClick={() => handleCopyJson(q)}>📋 Copiar JSON</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
