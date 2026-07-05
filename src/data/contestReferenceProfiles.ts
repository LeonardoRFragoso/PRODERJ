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

export function getContestReferenceProfile(contestId: string): ContestReferenceProfile | undefined {
  return contestReferenceProfiles[contestId];
}
