// Re-export from new multi-contest architecture for backward compatibility
export type { Career, CareerSubject } from '../types/career';
export { proderjCareers as careers, getCareerTotalPoints, getCareerPassingScore } from './contests';

import { proderjCareers } from './contests';
import type { Career } from '../types/career';

export const getCareerById = (id: string): Career | undefined => {
  return proderjCareers.find(c => c.id === id);
};
