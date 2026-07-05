export interface BoardStyleProfile {
  id: string;
  name: string;
  questionStyle: string[];
  avoid: string[];
  difficultyCalibration: {
    facil: string;
    medio: string;
    dificil: string;
  };
}

export interface ContestReferenceProfile {
  contestId: string;
  contestName: string;
  currentBoard: string;
  targetRole: string;
  contentSourcePriority: string[];
  styleSourcePriority: string[];
  previousExamUsageRule: string;
  generationRule: string;
}

export const boardStyleProfiles: Record<string, BoardStyleProfile> = {
  fgv: {
    id: 'fgv',
    name: 'Fundação Getulio Vargas',
    questionStyle: [
      'enunciados interpretativos',
      'alternativas longas e semanticamente próximas',
      'cobrança aplicada em cenários práticos',
      'pegadinhas conceituais sutis',
      "uso frequente de 'assinale a alternativa correta'",
      "uso frequente de 'assinale a alternativa incorreta'",
      'questões com análise de afirmações I, II e III',
      'questões que exigem diferenciação entre conceitos parecidos',
      'menor foco em decoreba simples',
      'maior foco em interpretação, aplicação e precisão técnica',
    ],
    avoid: [
      'questões óbvias',
      'alternativas absurdas',
      'enunciados curtos demais',
      'perguntas puramente decorativas',
      'gabarito ambíguo',
      'duas alternativas equivalentes',
      'copiar questões oficiais',
    ],
    difficultyCalibration: {
      facil: 'questão conceitual, mas ainda com alternativas plausíveis',
      medio: 'questão aplicada com cenário e duas alternativas competitivas',
      dificil: 'questão interpretativa, com cenário prático, alternativas muito próximas e exigência de domínio técnico',
    },
  },
  ibfc: {
    id: 'ibfc',
    name: 'Instituto Brasileiro de Formação e Capacitação',
    questionStyle: [
      'enunciados diretos e objetivos',
      'alternativas com distinção técnica clara',
      'cobrança conceitual e aplicada',
      'linguagem técnica formal',
      'questões com afirmações verdadeiras/falsas',
      'uso de cenários moderados',
    ],
    avoid: [
      'enunciados excessivamente longos',
      'alternativas ambíguas',
      'questões fora do edital',
      'copiar questões oficiais',
    ],
    difficultyCalibration: {
      facil: 'questão conceitual direta',
      medio: 'questão aplicada com cenário moderado',
      dificil: 'questão técnica com alternativas próximas e exigência de precisão',
    },
  },
};

export const contestReferenceProfiles: Record<string, ContestReferenceProfile> = {
  'dataprev-2026': {
    contestId: 'dataprev-2026',
    contestName: 'Dataprev 2026',
    currentBoard: 'fgv',
    targetRole: 'Analista de Tecnologia da Informação — Perfil 3: Desenvolvimento de Software',
    contentSourcePriority: [
      'Edital atual Dataprev 2026',
      'Conteúdo programático do Perfil 3 — Desenvolvimento de Software',
      'Legislação indicada no edital',
      'Referências técnicas compatíveis com o edital',
    ],
    styleSourcePriority: [
      'Provas anteriores da FGV para cargos de TI',
      'Provas anteriores da FGV para analista de sistemas e tecnologia',
      'Provas anteriores da FGV em concursos federais de nível superior',
      'Provas anteriores da Dataprev apenas como referência temática',
    ],
    previousExamUsageRule:
      'Provas anteriores devem ser usadas apenas para calibrar estilo, dificuldade, recorrência de temas e estrutura de alternativas. É proibido copiar questões oficiais ou reproduzir enunciados.',
    generationRule:
      'Gerar questões autorais seguindo o edital atual e o estilo da banca atual.',
  },
};

export function getBoardProfile(boardId: string): BoardStyleProfile | undefined {
  return boardStyleProfiles[boardId];
}

export function getContestReferenceProfile(contestId: string): ContestReferenceProfile | undefined {
  return contestReferenceProfiles[contestId];
}
