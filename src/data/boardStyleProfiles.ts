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

export function getBoardProfile(boardId: string): BoardStyleProfile | undefined {
  return boardStyleProfiles[boardId];
}
