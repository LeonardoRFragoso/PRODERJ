import type { Contest } from '../types/contest';
import type { Career } from '../types/career';

export const proderjCareers: Career[] = [
  {
    id: 'analista',
    contestId: 'proderj-2026',
    name: 'Analista de Sistemas e Métodos',
    shortName: 'Analista',
    level: 'superior',
    totalQuestions: 60,
    duration: 4 * 60 * 60,
    salary: 'R$ 4.549,35',
    description: 'Análise e desenvolvimento de sistemas, arquitetura de software, banco de dados, segurança da informação.',
    subjects: [
      { id: 'portugues', name: 'Língua Portuguesa', questionCount: 10, weight: 2, maxPoints: 20 },
      { id: 'logica', name: 'Raciocínio Lógico-Matemático', questionCount: 10, weight: 2, maxPoints: 20 },
      { id: 'direito', name: 'Direito Administrativo e Constitucional', questionCount: 10, weight: 2, maxPoints: 20 },
      { id: 'especificos_analista', name: 'Conhecimentos Específicos - Analista', questionCount: 30, weight: 3, maxPoints: 90 },
    ],
  },
  {
    id: 'tecnico',
    contestId: 'proderj-2026',
    name: 'Técnico de Suporte, Computação e Processamento',
    shortName: 'Técnico de Suporte',
    level: 'tecnico',
    totalQuestions: 60,
    duration: 4 * 60 * 60,
    salary: 'R$ 2.141,93',
    description: 'Suporte técnico, manutenção de hardware e software, redes, sistemas operacionais Windows e Linux.',
    subjects: [
      { id: 'portugues', name: 'Língua Portuguesa', questionCount: 10, weight: 2, maxPoints: 20 },
      { id: 'logica', name: 'Raciocínio Lógico-Matemático', questionCount: 10, weight: 2, maxPoints: 20 },
      { id: 'direito', name: 'Direito Administrativo e Constitucional', questionCount: 10, weight: 2, maxPoints: 20 },
      { id: 'especificos_tecnico', name: 'Conhecimentos Específicos - Técnico', questionCount: 30, weight: 3, maxPoints: 90 },
    ],
  },
];

export const dataprevCareers: Career[] = [
  {
    id: 'dataprev-dev',
    contestId: 'dataprev-2026',
    name: 'Analista de Tecnologia da Informação — Perfil 3: Desenvolvimento de Software',
    shortName: 'TI — Desenvolvimento de Software',
    level: 'superior',
    totalQuestions: 70,
    duration: 4 * 60 * 60,
    salary: 'Conforme edital',
    description: 'Desenvolvimento de software, arquitetura, APIs, segurança, dados, DevOps, IA e governança de TI.',
    subjects: [
      { id: 'portugues', name: 'Língua Portuguesa', questionCount: 12, weight: 1, maxPoints: 12 },
      { id: 'ingles', name: 'Língua Inglesa', questionCount: 12, weight: 1, maxPoints: 12 },
      { id: 'logica', name: 'Raciocínio Lógico Matemático', questionCount: 5, weight: 1, maxPoints: 5 },
      { id: 'atualidades_ia', name: 'Atualidades e Inteligência Artificial', questionCount: 6, weight: 1, maxPoints: 6 },
      { id: 'legislacao_seguranca', name: 'Legislação acerca de Segurança da Informação e Proteção de Dados', questionCount: 5, weight: 1, maxPoints: 5 },
      { id: 'especificos_dev', name: 'Conhecimentos Específicos - Desenvolvimento de Software', questionCount: 30, weight: 2.5, maxPoints: 75 },
    ],
    passingScore: 57.5,
    requireNoZeroedSubject: true,
  },
];

export const contests: Contest[] = [
  {
    id: 'proderj-2026',
    name: 'Simulado PRODERJ 2026',
    shortName: 'PRODERJ',
    year: '2026',
    board: 'IBFC',
    description: 'Concurso Público PRODERJ 2026 — Centro de Tecnologia da Informação e Comunicação do Estado do Rio de Janeiro',
    icon: '🏛️',
    careers: proderjCareers,
  },
  {
    id: 'dataprev-2026',
    name: 'Simulado Dataprev 2026',
    shortName: 'Dataprev',
    year: '2026',
    board: 'FGV',
    description: 'Concurso Público Dataprev 2026 — Empresa de Tecnologia e Informações da Previdência',
    icon: '💻',
    careers: dataprevCareers,
  },
];

export const getContestById = (id: string): Contest | undefined => {
  return contests.find(c => c.id === id);
};

export const getCareerById = (contestId: string, careerId: string): Career | undefined => {
  const contest = getContestById(contestId);
  return contest?.careers.find(c => c.id === careerId);
};

export const getCareerTotalPoints = (career: Career): number => {
  return career.subjects.reduce((sum, s) => sum + s.maxPoints, 0);
};

export const getCareerPassingScore = (career: Career): number => {
  if (career.passingScore !== undefined) return career.passingScore;
  return getCareerTotalPoints(career) * 0.5;
};
