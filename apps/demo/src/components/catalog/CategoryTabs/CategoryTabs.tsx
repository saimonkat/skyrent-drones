import { cn } from '@demo/lib/cn';
import { CATEGORIES } from './constants';
import type { CategoryTabsProps } from './types';

export function CategoryTabs({ activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2" role="tablist" aria-label="Drone categories">
      {CATEGORIES.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={activeCategory === tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            activeCategory === tab.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
