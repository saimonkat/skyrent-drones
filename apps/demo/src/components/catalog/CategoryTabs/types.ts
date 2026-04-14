import type { CategoryFilter } from '@demo/types';

export interface CategoryTabsProps {
  activeCategory: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}
