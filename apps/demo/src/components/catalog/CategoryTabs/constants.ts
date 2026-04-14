import type { CategoryFilter } from '@demo/types';

export const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'filming', label: 'Filming Drones' },
  { value: 'cargo', label: 'Cargo Drones' },
];
