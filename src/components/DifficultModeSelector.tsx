import type { ExamMode } from '../types/examMode';

interface DifficultModeSelectorProps {
  value: ExamMode;
  onChange: (mode: ExamMode) => void;
  isDataprev: boolean;
}

const MODES: { id: ExamMode; label: string; icon: string; description: string; dataprevOnly?: boolean }[] = [
  { id: 'full', label: 'Simulado Completo', icon: '📝', description: 'Prova completa no padrão oficial' },
  { id: 'hard', label: 'Simulado Difícil', icon: '🔥', description: 'Prioriza questões difíceis', dataprevOnly: true },
  { id: 'training', label: 'Treino por Disciplina', icon: '📚', description: 'Foque em uma disciplina específica' },
  { id: 'weak-topics', label: 'Reforço por Pontos Fracos', icon: '🎯', description: 'Questões sobre seus tópicos mais fracos', dataprevOnly: true },
];

export default function DifficultModeSelector({ value, onChange, isDataprev }: DifficultModeSelectorProps) {
  const availableModes = MODES.filter(m => !m.dataprevOnly || isDataprev);

  return (
    <div className="mode-selector">
      <h3>Modo de Simulado</h3>
      <div className="mode-grid">
        {availableModes.map(mode => (
          <button
            key={mode.id}
            className={`mode-card ${value === mode.id ? 'selected' : ''}`}
            onClick={() => onChange(mode.id)}
          >
            <span className="mode-icon">{mode.icon}</span>
            <span className="mode-label">{mode.label}</span>
            <span className="mode-description">{mode.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
