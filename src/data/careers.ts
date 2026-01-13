// Definição dos cargos disponíveis no concurso PRODERJ

export interface Career {
  id: string;
  name: string;
  shortName: string;
  level: 'medio' | 'tecnico' | 'superior';
  totalQuestions: number;
  duration: number; // em segundos
  salary: string;
  description: string;
  subjects: CareerSubject[];
}

export interface CareerSubject {
  id: string;
  name: string;
  questionCount: number;
  weight: number;
  maxPoints: number;
}

export const careers: Career[] = [
  {
    id: 'analista',
    name: 'Analista de Sistemas e Métodos',
    shortName: 'Analista',
    level: 'superior',
    totalQuestions: 60,
    duration: 4 * 60 * 60, // 4 horas
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
    name: 'Técnico de Suporte, Computação e Processamento',
    shortName: 'Técnico de Suporte',
    level: 'tecnico',
    totalQuestions: 60,
    duration: 4 * 60 * 60, // 4 horas
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

export const getCareerById = (id: string): Career | undefined => {
  return careers.find(c => c.id === id);
};

export const getCareerTotalPoints = (career: Career): number => {
  return career.subjects.reduce((sum, s) => sum + s.maxPoints, 0);
};

export const getCareerPassingScore = (career: Career): number => {
  return getCareerTotalPoints(career) * 0.5; // 50% para aprovação
};
