import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { subjects } from './data/questions';
import { contests, getContestById, getCareerTotalPoints, getCareerPassingScore } from './data/contests';
import type { Question } from './types/question';
import type { Career } from './types/career';
import type { Contest } from './types/contest';
import type { ExamMode } from './types/examMode';
import { getQuestionsForCareer, getQuestionsForTraining } from './services/examService';
import { calculateScore } from './services/scoringService';
import type { AttemptHistory, Answer, ActiveQuizState } from './services/storageService';
import {
  loadHistory, saveHistory, saveActiveQuiz, loadActiveQuiz,
  clearActiveQuiz, generateId,
} from './services/storageService';
import DifficultModeSelector from './components/DifficultModeSelector';
import AIQuestionGeneratorPanel from './components/AIQuestionGeneratorPanel';

const AI_GENERATOR_ENABLED = import.meta.env.VITE_ENABLE_AI_GENERATOR === 'true';

type GameState = 'contest-select' | 'career-select' | 'start' | 'playing' | 'results' | 'history' | 'ai-generator';

interface SubjectScore {
  subjectId: string;
  subjectName: string;
  correct: number;
  total: number;
  points: number;
  maxPoints: number;
}

interface QuestionStats {
  questionId: number;
  questionText: string;
  subjectName: string;
  timesAnswered: number;
  timesCorrect: number;
  timesWrong: number;
  errorRate: number;
}

const getSubjectsForCareer = (career: Career) => {
  return career.subjects.map(s => ({
    id: s.id,
    name: s.name,
    questionCount: s.questionCount,
    weight: s.weight,
    maxPoints: s.maxPoints,
  }));
};

function App() {
  const [gameState, setGameState] = useState<GameState>('contest-select');
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [history, setHistory] = useState<AttemptHistory[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<AttemptHistory | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [examMode, setExamMode] = useState<ExamMode>('full');
  const [trainingSubject, setTrainingSubject] = useState<string>('');

  const currentSubjects = selectedCareer ? getSubjectsForCareer(selectedCareer) : subjects;
  const totalPoints = selectedCareer ? getCareerTotalPoints(selectedCareer) : 150;
  const passingScore = selectedCareer ? getCareerPassingScore(selectedCareer) : 75;

  useEffect(() => {
    setHistory(loadHistory());

    const activeQuiz = loadActiveQuiz();
    if (activeQuiz) {
      const contestId = activeQuiz.contestId || 'proderj-2026';
      const contest = getContestById(contestId);
      const career = contest?.careers.find(c => c.id === activeQuiz.careerId);
      if (contest && career) {
        const allQuestions = getQuestionsForCareer(career);
        const orderedQuestions = activeQuiz.shuffledQuestionIds
          .map(id => allQuestions.find(q => q.id === id))
          .filter((q): q is Question => q !== undefined);

        if (orderedQuestions.length === activeQuiz.shuffledQuestionIds.length) {
          setSelectedContest(contest);
          setSelectedCareer(career);
          setShuffledQuestions(orderedQuestions);
          setCurrentQuestionIndex(activeQuiz.currentQuestionIndex);
          setAnswers(activeQuiz.answers);
          setTimeLeft(activeQuiz.timeLeft);
          setStartTime(activeQuiz.startTime);
          setGameState('playing');

          const currentAnswer = activeQuiz.answers.find(
            a => a.questionId === orderedQuestions[activeQuiz.currentQuestionIndex]?.id
          );
          if (currentAnswer) {
            setSelectedAnswer(currentAnswer.selectedAnswer);
            setShowExplanation(true);
          }
        }
      }
    }
  }, []);

  const selectContest = (contest: Contest) => {
    setSelectedContest(contest);
    setGameState('career-select');
  };

  const selectCareer = (career: Career) => {
    setSelectedCareer(career);
    setGameState('start');
  };

  const startQuiz = () => {
    if (!selectedCareer) return;
    let careerQuestions: Question[];
    if (examMode === 'training' && trainingSubject) {
      careerQuestions = getQuestionsForTraining(selectedCareer, trainingSubject, selectedCareer.totalQuestions);
    } else {
      careerQuestions = getQuestionsForCareer(selectedCareer, examMode);
    }
    setShuffledQuestions(careerQuestions);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(selectedCareer.duration);
    setStartTime(Date.now());
  };

  const saveAttemptToHistory = useCallback(() => {
    if (!selectedContest || !selectedCareer) return;

    const subjectScoresData: SubjectScore[] = currentSubjects.map(subject => {
      const subjectQuestions = shuffledQuestions.filter(q => q.subject === subject.id);
      const subjectAnswers = answers.filter(a => subjectQuestions.some(q => q.id === a.questionId));
      const correct = subjectAnswers.filter(a => a.isCorrect).length;
      const points = correct * subject.weight;
      return {
        subjectId: subject.id,
        subjectName: subject.name,
        correct,
        total: subjectQuestions.length,
        points,
        maxPoints: subject.maxPoints,
      };
    });

    const answersMap = new Map<number, string | null>();
    answers.forEach(a => answersMap.set(a.questionId, a.selectedAnswer));
    const scoring = calculateScore(selectedCareer, shuffledQuestions, answersMap);

    const attemptTotalPoints = subjectScoresData.reduce((sum, s) => sum + s.points, 0);
    const correctCount = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((attemptTotalPoints / totalPoints) * 100);
    const passed = scoring.passed;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    const attempt: AttemptHistory = {
      id: generateId(),
      contestId: selectedContest.id,
      contestName: selectedContest.name,
      careerId: selectedCareer.id,
      careerName: selectedCareer.name,
      date: new Date().toISOString(),
      totalPoints: attemptTotalPoints,
      maxPoints: totalPoints,
      correctCount,
      totalQuestions: shuffledQuestions.length,
      percentage,
      passed,
      timeSpent,
      answers: [...answers],
      subjectScores: subjectScoresData,
    };

    const updatedHistory = [attempt, ...history].slice(0, 50);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  }, [answers, shuffledQuestions, startTime, history, currentSubjects, totalPoints, selectedContest, selectedCareer]);

  const getQuestionStats = useCallback((): QuestionStats[] => {
    const statsMap = new Map<number, QuestionStats>();

    history.forEach(attempt => {
      attempt.answers.forEach(answer => {
        const existing = statsMap.get(answer.questionId);
        if (existing) {
          existing.timesAnswered++;
          if (answer.isCorrect) existing.timesCorrect++;
          else existing.timesWrong++;
          existing.errorRate = (existing.timesWrong / existing.timesAnswered) * 100;
        } else {
          statsMap.set(answer.questionId, {
            questionId: answer.questionId,
            questionText: answer.questionText,
            subjectName: answer.subjectName,
            timesAnswered: 1,
            timesCorrect: answer.isCorrect ? 1 : 0,
            timesWrong: answer.isCorrect ? 0 : 1,
            errorRate: answer.isCorrect ? 0 : 100,
          });
        }
      });
    });

    return Array.from(statsMap.values()).sort((a, b) => b.errorRate - a.errorRate);
  }, [history]);

  const clearHistory = () => {
    if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
      setHistory([]);
      localStorage.removeItem('proderj_quiz_history');
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleSelectAnswer = (letter: string) => {
    if (showExplanation) return;
    setSelectedAnswer(letter);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      questionText: currentQuestion.text,
      subjectId: currentQuestion.subject,
      subjectName: currentQuestion.subjectName,
    };
    setAnswers([...answers, newAnswer]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      saveAttemptToHistory();
      setGameState('results');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevAnswer = answers.find(a => a.questionId === shuffledQuestions[currentQuestionIndex - 1]?.id);
      setSelectedAnswer(prevAnswer?.selectedAnswer || null);
      setShowExplanation(!!prevAnswer);
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && selectedContest && selectedCareer && shuffledQuestions.length > 0) {
      const state: ActiveQuizState = {
        contestId: selectedContest.id,
        careerId: selectedCareer.id,
        currentQuestionIndex,
        answers,
        shuffledQuestionIds: shuffledQuestions.map(q => q.id),
        timeLeft,
        startTime,
      };
      saveActiveQuiz(state);
    }
  }, [gameState, selectedContest, selectedCareer, currentQuestionIndex, answers, shuffledQuestions, timeLeft, startTime]);

  useEffect(() => {
    if (gameState === 'results') {
      clearActiveQuiz();
    }
  }, [gameState]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (gameState === 'playing') {
        e.preventDefault();
        e.returnValue = 'Você tem uma prova em andamento. Tem certeza que deseja sair?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [gameState]);

  const handleQuitQuiz = () => {
    if (confirm('⚠️ ATENÇÃO!\n\nVocê está prestes a DESISTIR da prova.\nTodo o seu progresso será perdido.\n\nTem certeza que deseja desistir?')) {
      clearActiveQuiz();
      setGameState('career-select');
      setShuffledQuestions([]);
      setAnswers([]);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const calculateResults = useCallback(() => {
    const answersMap = new Map<number, string | null>();
    answers.forEach(a => answersMap.set(a.questionId, a.selectedAnswer));
    if (!selectedCareer) {
      return { totalPoints: 0, correctCount: 0, subjectScores: [] as any[], passed: false, zeroedSubjects: [] as string[] };
    }
    return calculateScore(selectedCareer, shuffledQuestions, answersMap);
  }, [answers, shuffledQuestions, selectedCareer]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setGameState('results'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTimerClass = (): string => {
    if (timeLeft < 600) return 'timer danger';
    if (timeLeft < 1800) return 'timer warning';
    return 'timer';
  };

  const getOptionClass = (letter: string): string => {
    if (!showExplanation) return selectedAnswer === letter ? 'option-btn selected' : 'option-btn';
    if (letter === currentQuestion?.correctAnswer) return 'option-btn correct';
    if (letter === selectedAnswer && letter !== currentQuestion?.correctAnswer) return 'option-btn incorrect';
    return 'option-btn';
  };

  const progress = shuffledQuestions.length > 0 ? ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100 : 0;

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}min` : `${m}min`;
  };

  // === CONTEST SELECT SCREEN ===
  if (gameState === 'contest-select') {
    return (
      <div className="app">
        <div className="container">
          <div className="header">
            <h1>📝 Plataforma de Simulados</h1>
            <p>Escolha o Concurso</p>
          </div>
          <div className="start-screen">
            <h2>Escolha o Concurso</h2>
            <p>Selecione o concurso para o qual deseja simular. Cada concurso possui cargos, disciplinas e regras próprias.</p>
            <div className="career-grid">
              {contests.map(contest => (
                <div
                  key={contest.id}
                  className="career-card"
                  onClick={() => selectContest(contest)}
                >
                  <div className="career-level">{contest.icon} {contest.board}</div>
                  <h3>{contest.name}</h3>
                  <p className="career-description">{contest.description}</p>
                  <div className="career-info">
                    <span className="career-questions">{contest.careers.length} cargo(s)</span>
                  </div>
                  <div className="career-subjects">
                    {contest.careers.map(c => (
                      <span key={c.id} className="career-subject-tag">
                        {c.shortName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === CAREER SELECT SCREEN ===
  if (gameState === 'career-select' || (gameState === 'start' && !selectedCareer)) {
    const contest = selectedContest;
    if (!contest) {
      setGameState('contest-select');
      return null;
    }
    return (
      <div className="app">
        <div className="container">
          <div className="header">
            <h1>{contest.icon} {contest.name}</h1>
            <p>Concurso Público - Selecione o Cargo</p>
          </div>
          <div className="start-screen">
            <h2>Escolha o Cargo</h2>
            <p>Selecione o cargo para o qual deseja treinar. Cada cargo possui questões específicas conforme o edital.</p>
            <div className="career-grid">
              {contest.careers.map(career => (
                <div
                  key={career.id}
                  className={`career-card ${selectedCareer?.id === career.id ? 'selected' : ''}`}
                  onClick={() => selectCareer(career)}
                >
                  <div className="career-level">{career.level === 'superior' ? '🎓 Nível Superior' : '🔧 Nível Técnico'}</div>
                  <h3>{career.name}</h3>
                  <p className="career-description">{career.description}</p>
                  <div className="career-info">
                    <span className="career-salary">{career.salary}</span>
                    <span className="career-questions">{career.totalQuestions} questões</span>
                  </div>
                  <div className="career-subjects">
                    {career.subjects.map(s => (
                      <span key={s.id} className="career-subject-tag">
                        {s.name.split(' - ')[0]}: {s.questionCount}q
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="start-actions">
              <button className="nav-btn secondary" onClick={() => { setSelectedContest(null); setGameState('contest-select'); }}>
                🔄 Trocar Concurso
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === HISTORY SCREEN ===
  if (gameState === 'history') {
    const questionStats = getQuestionStats();
    const mostMissedQuestions = questionStats.filter(q => q.errorRate > 0).slice(0, 10);

    return (
      <div className="app">
        <div className="container">
          <div className="header">
            <h1>📝 {selectedContest ? selectedContest.name : 'Simulado'}</h1>
            <p>Histórico de Tentativas</p>
          </div>

          {selectedAttempt ? (
            <div className="history-detail">
              <div className="history-detail-header">
                <h2>Detalhes da Tentativa</h2>
                <p>{formatDate(selectedAttempt.date)}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {selectedAttempt.contestName || 'PRODERJ'} — {selectedAttempt.careerName || selectedAttempt.careerId}
                </p>
              </div>

              <div className="score-display">
                <div className={`score-card ${selectedAttempt.passed ? 'highlight' : 'danger'}`}>
                  <div className="score-value">{selectedAttempt.totalPoints}</div>
                  <div className="score-label">de {selectedAttempt.maxPoints} pontos</div>
                </div>
                <div className="score-card">
                  <div className="score-value">{selectedAttempt.correctCount}</div>
                  <div className="score-label">de {selectedAttempt.totalQuestions} acertos</div>
                </div>
                <div className="score-card">
                  <div className="score-value">{selectedAttempt.percentage}%</div>
                  <div className="score-label">aproveitamento</div>
                </div>
              </div>

              <div className="answers-review">
                <h3>📋 Respostas Detalhadas</h3>
                {selectedAttempt.answers.map((answer, idx) => (
                  <div key={idx} className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="answer-header">
                      <span className="answer-number">Questão {idx + 1}</span>
                      <span className="answer-subject">{answer.subjectName}</span>
                      <span className={`answer-status ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        {answer.isCorrect ? '✓ Correta' : '✗ Errada'}
                      </span>
                    </div>
                    <p className="answer-question">{answer.questionText.substring(0, 150)}...</p>
                    <div className="answer-details">
                      <span>Sua resposta: <strong>{answer.selectedAnswer}</strong></span>
                      {!answer.isCorrect && <span>Correta: <strong>{answer.correctAnswer}</strong></span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="results-actions">
                <button className="nav-btn secondary" onClick={() => setSelectedAttempt(null)}>← Voltar ao Histórico</button>
              </div>
            </div>
          ) : (
            <div className="history-screen">
              {history.length === 0 ? (
                <div className="empty-history">
                  <h3>📭 Nenhuma tentativa registrada</h3>
                  <p>Complete um simulado para ver seu histórico aqui.</p>
                </div>
              ) : (
                <>
                  <div className="history-summary">
                    <h3>📈 Resumo Geral</h3>
                    <div className="summary-cards">
                      <div className="summary-card">
                        <div className="summary-value">{history.length}</div>
                        <div className="summary-label">Tentativas</div>
                      </div>
                      <div className="summary-card">
                        <div className="summary-value">{history.filter(h => h.passed).length}</div>
                        <div className="summary-label">Aprovações</div>
                      </div>
                      <div className="summary-card">
                        <div className="summary-value">
                          {Math.round(history.reduce((sum, h) => sum + h.percentage, 0) / history.length)}%
                        </div>
                        <div className="summary-label">Média</div>
                      </div>
                      <div className="summary-card">
                        <div className="summary-value">
                          {Math.max(...history.map(h => h.percentage))}%
                        </div>
                        <div className="summary-label">Melhor</div>
                      </div>
                    </div>
                  </div>

                  {mostMissedQuestions.length > 0 && (
                    <div className="missed-questions">
                      <h3>⚠️ Questões Mais Erradas</h3>
                      <p className="missed-subtitle">Foque nestas questões para melhorar seu desempenho</p>
                      {mostMissedQuestions.map((q, idx) => (
                        <div key={q.questionId} className="missed-item">
                          <div className="missed-rank">#{idx + 1}</div>
                          <div className="missed-content">
                            <div className="missed-subject">{q.subjectName}</div>
                            <div className="missed-text">{q.questionText.substring(0, 100)}...</div>
                            <div className="missed-stats">
                              <span className="missed-error-rate">{Math.round(q.errorRate)}% de erro</span>
                              <span className="missed-count">{q.timesWrong}/{q.timesAnswered} erros</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="history-list">
                    <h3>📜 Tentativas Anteriores</h3>
                    {history.map(attempt => (
                      <div
                        key={attempt.id}
                        className={`history-item ${attempt.passed ? 'passed' : 'failed'}`}
                        onClick={() => setSelectedAttempt(attempt)}
                      >
                        <div className="history-item-left">
                          <div className="history-date">{formatDate(attempt.date)}</div>
                          <div className="history-duration">
                            {attempt.contestName || 'PRODERJ'} — {formatDuration(attempt.timeSpent)}
                          </div>
                        </div>
                        <div className="history-item-center">
                          <div className="history-score">{attempt.totalPoints}/{attempt.maxPoints} pts</div>
                          <div className="history-correct">{attempt.correctCount}/{attempt.totalQuestions} acertos</div>
                        </div>
                        <div className="history-item-right">
                          <div className={`history-percentage ${attempt.passed ? 'passed' : 'failed'}`}>
                            {attempt.percentage}%
                          </div>
                          <div className={`history-status ${attempt.passed ? 'passed' : 'failed'}`}>
                            {attempt.passed ? '✓ Aprovado' : '✗ Reprovado'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="results-actions">
                    <button className="nav-btn danger" onClick={clearHistory}>🗑️ Limpar Histórico</button>
                  </div>
                </>
              )}

              <div className="results-actions" style={{ marginTop: '20px' }}>
                <button className="nav-btn primary" onClick={startQuiz}>🚀 Novo Simulado</button>
                <button className="nav-btn secondary" onClick={() => setGameState('contest-select')}>🏠 Voltar ao Início</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // === START SCREEN ===
  if (gameState === 'start' && selectedCareer) {
    return (
      <div className="app">
        <div className="container">
          <div className="header">
            <h1>{selectedContest?.icon} {selectedContest?.name}</h1>
            <p>Concurso Público - {selectedCareer.name}</p>
          </div>
          <div className="start-screen">
            <h2>Bem-vindo ao Simulado!</h2>
            <p>Este simulado segue o padrão oficial do concurso <strong>{selectedContest?.name}</strong> para o cargo de <strong>{selectedCareer.name}</strong>, com {selectedCareer.totalQuestions} questões distribuídas conforme o edital.</p>
            <div className="subjects-grid">
              {currentSubjects.map(subject => (
                <div key={subject.id} className="subject-card">
                  <h4>{subject.name}</h4>
                  <p>{subject.questionCount} questões</p>
                  <p>Peso: {subject.weight} pontos cada</p>
                  <p><strong>Máximo: {subject.maxPoints} pts</strong></p>
                </div>
              ))}
            </div>
            <div className="exam-info">
              <div className="info-badge"><strong>{selectedCareer.totalQuestions}</strong> questões</div>
              <div className="info-badge"><strong>{totalPoints}</strong> pontos totais</div>
              <div className="info-badge"><strong>{passingScore}</strong> pontos para aprovação</div>
              <div className="info-badge"><strong>4 horas</strong> de duração</div>
            </div>
            {selectedCareer.requireNoZeroedSubject && (
              <div className="exam-info" style={{ marginTop: '12px' }}>
                <div className="info-badge" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'var(--danger)' }}>
                  ⚠️ <strong>Regra:</strong> Reprova se zerar qualquer disciplina
                </div>
              </div>
            )}
            <DifficultModeSelector
              value={examMode}
              onChange={setExamMode}
              isDataprev={selectedContest?.id === 'dataprev-2026'}
            />
            {examMode === 'training' && (
              <div className="training-subject-selector">
                <h4>Escolha a disciplina para treino:</h4>
                <select value={trainingSubject} onChange={e => setTrainingSubject(e.target.value)}>
                  <option value="">Selecione uma disciplina...</option>
                  {currentSubjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="start-actions">
              <button className="nav-btn primary start-btn" onClick={startQuiz} disabled={examMode === 'training' && !trainingSubject}>
                🚀 Iniciar Simulado
              </button>
              <button className="nav-btn secondary" onClick={() => { setSelectedCareer(null); setGameState('career-select'); }}>
                🔄 Trocar Cargo
              </button>
              {history.length > 0 && (
                <button className="nav-btn secondary" onClick={() => setGameState('history')}>
                  📊 Ver Histórico ({history.length})
                </button>
              )}
              {AI_GENERATOR_ENABLED && selectedContest?.id === 'dataprev-2026' && (
                <button className="nav-btn secondary" onClick={() => setGameState('ai-generator')}>
                  🤖 Gerador de Questões IA
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === AI GENERATOR SCREEN ===
  if (gameState === 'ai-generator' && selectedCareer && selectedContest) {
    return (
      <div className="app">
        <div className="container">
          <div className="header">
            <h1>{selectedContest.icon} {selectedContest.name}</h1>
            <p>🤖 Geração Assistida de Questões com IA</p>
          </div>
          <AIQuestionGeneratorPanel
            career={selectedCareer}
            contestId={selectedContest.id}
            history={history}
          />
          <div className="results-actions" style={{ marginTop: '20px' }}>
            <button className="nav-btn secondary" onClick={() => setGameState('start')}>← Voltar</button>
          </div>
        </div>
      </div>
    );
  }

  // === RESULTS SCREEN ===
  if (gameState === 'results') {
    const scoring = calculateResults();
    const resultPoints = scoring.totalPoints;
    const correctCount = scoring.correctCount;
    const subjectScores = scoring.subjectScores;
    const passed = scoring.passed;
    const zeroedSubjects = scoring.zeroedSubjects;
    const totalQuestions = shuffledQuestions.length;
    const percentage = Math.round((resultPoints / totalPoints) * 100);

    return (
      <div className="app">
        <div className="container">
          <div className="header">
            <h1>{selectedContest?.icon} {selectedContest?.name}</h1>
            <p>Resultado Final</p>
          </div>
          <div className="results-screen">
            <div className={`results-header ${passed ? 'passed' : 'failed'}`}>
              <h2>{passed ? '🎉 Parabéns! Você foi aprovado!' : '😔 Não foi dessa vez...'}</h2>
              <p>{passed ? 'Você atingiu a pontuação mínima para aprovação!' : 'Continue estudando, você está no caminho certo!'}</p>
            </div>
            <div className="score-display">
              <div className={`score-card ${passed ? 'highlight' : 'danger'}`}>
                <div className="score-value">{resultPoints}</div>
                <div className="score-label">de {totalPoints} pontos</div>
              </div>
              <div className="score-card">
                <div className="score-value">{correctCount}</div>
                <div className="score-label">de {totalQuestions} acertos</div>
              </div>
              <div className="score-card">
                <div className="score-value">{percentage}%</div>
                <div className="score-label">aproveitamento</div>
              </div>
            </div>
            {zeroedSubjects.length > 0 && (
              <div className="results-header failed" style={{ marginTop: '16px' }}>
                <h2 style={{ fontSize: '1.1rem' }}>⚠️ Disciplina(s) zerada(s):</h2>
                <p>{zeroedSubjects.join(', ')}</p>
              </div>
            )}
            <div className="subject-results">
              <h3>📊 Desempenho por Matéria</h3>
              {subjectScores.map(score => (
                <div key={score.subject.id} className="subject-result-item">
                  <span className="subject-result-name">{score.subject.name}</span>
                  <div className="subject-result-score">
                    <div className="subject-result-bar">
                      <div className="subject-result-fill" style={{ width: `${(score.points / score.maxPoints) * 100}%` }} />
                    </div>
                    <span className="subject-result-text">{score.correct}/{score.total} ({score.points}/{score.maxPoints} pts)</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="results-actions">
              <button className="nav-btn primary" onClick={startQuiz}>🔄 Refazer Simulado</button>
              <button className="nav-btn secondary" onClick={() => setGameState('history')}>📊 Ver Histórico</button>
              <button className="nav-btn secondary" onClick={() => setGameState('start')}>🏠 Voltar ao Início</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === PLAYING SCREEN ===
  if (!currentQuestion) return <div className="app">Carregando...</div>;

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>{selectedContest?.icon} {selectedContest?.shortName}</h1>
          <div className="exam-info">
            <div className="info-badge">Questão <strong>{currentQuestionIndex + 1}</strong> de <strong>{shuffledQuestions.length}</strong></div>
            <div className="info-badge">Respondidas: <strong>{answers.length}</strong></div>
            <div className={getTimerClass()}>⏱️ {formatTime(timeLeft)}</div>
            <button className="quit-btn" onClick={handleQuitQuiz} title="Desistir da prova">✕ Desistir</button>
          </div>
        </div>
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-text">Progresso</span>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="question-card">
          <div className="question-meta">
            <span className="subject-badge">{currentQuestion.subjectName}</span>
            <span className="weight-badge">Peso: {currentQuestion.weight} pontos</span>
            {currentQuestion.id >= 100000 && (
              <span className="ai-badge">🤖 IA Revisada</span>
            )}
          </div>
          <div className="question-number">Questão {currentQuestionIndex + 1}</div>
          <div className="question-text">
            {currentQuestion.text.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < currentQuestion.text.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
          <div className="options-list">
            {currentQuestion.options.map(option => (
              <button key={option.letter} className={getOptionClass(option.letter)} onClick={() => handleSelectAnswer(option.letter)} disabled={showExplanation}>
                <span className="option-letter">{option.letter}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
          </div>
          {showExplanation && currentQuestion.explanation && (
            <div className="explanation">
              <div className="explanation-title">💡 Explicação</div>
              <div className="explanation-text">{currentQuestion.explanation}</div>
            </div>
          )}
          <div className="navigation">
            <button className="nav-btn secondary" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>← Anterior</button>
            {!showExplanation ? (
              <button className="nav-btn primary" onClick={handleConfirmAnswer} disabled={!selectedAnswer}>Confirmar Resposta</button>
            ) : (
              <button className="nav-btn success" onClick={handleNextQuestion}>
                {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Ver Resultado' : 'Próxima →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
