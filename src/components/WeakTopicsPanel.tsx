import type { AttemptHistory } from '../services/storageService';

interface WeakTopicsPanelProps {
  history: AttemptHistory[];
  onGenerate: (weakTopics: string[]) => void;
}

interface WeakTopic {
  subjectName: string;
  errorRate: number;
  correct: number;
  total: number;
}

export default function WeakTopicsPanel({ history, onGenerate }: WeakTopicsPanelProps) {
  const subjectStats = new Map<string, WeakTopic>();

  for (const attempt of history) {
    for (const ss of attempt.subjectScores) {
      const existing = subjectStats.get(ss.subjectName);
      if (existing) {
        existing.correct += ss.correct;
        existing.total += ss.total;
        existing.errorRate = 1 - (existing.correct / existing.total);
      } else {
        subjectStats.set(ss.subjectName, {
          subjectName: ss.subjectName,
          correct: ss.correct,
          total: ss.total,
          errorRate: 1 - (ss.correct / ss.total),
        });
      }
    }
  }

  const weakTopics = [...subjectStats.values()]
    .filter(t => t.total > 0)
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, 5);

  if (history.length === 0) {
    return (
      <div className="ai-panel-section">
        <h3>🎯 Reforço por Pontos Fracos</h3>
        <p className="empty-state">Complete simulados para identificar seus pontos fracos.</p>
      </div>
    );
  }

  if (weakTopics.length === 0) {
    return (
      <div className="ai-panel-section">
        <h3>🎯 Reforço por Pontos Fracos</h3>
        <p className="empty-state">Sem dados suficientes para identificar pontos fracos.</p>
      </div>
    );
  }

  return (
    <div className="ai-panel-section">
      <h3>🎯 Reforço por Pontos Fracos</h3>
      <div className="weak-topics-list">
        {weakTopics.map(t => (
          <div key={t.subjectName} className="weak-topic-item">
            <span className="weak-topic-name">{t.subjectName}</span>
            <div className="weak-topic-bar">
              <div className="weak-topic-fill" style={{ width: `${Math.round(t.errorRate * 100)}%` }} />
            </div>
            <span className="weak-topic-rate">{Math.round(t.errorRate * 100)}% erro</span>
          </div>
        ))}
      </div>
      <button
        className="nav-btn primary"
        onClick={() => onGenerate(weakTopics.map(t => t.subjectName))}
      >
        🔥 Gerar questões difíceis sobre meus pontos fracos
      </button>
    </div>
  );
}
