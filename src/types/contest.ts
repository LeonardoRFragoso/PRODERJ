import type { Career } from './career';

export interface Contest {
  id: string;
  name: string;
  shortName: string;
  year: string;
  board: string;
  description: string;
  icon?: string;
  careers: Career[];
}
