import type { RentalDaysInputProps } from './types';

export function RentalDaysInput({ value, onChange, min = 1, max = 7 }: RentalDaysInputProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition-colors hover:border-gray-300 disabled:opacity-40"
      >
        -
      </button>
      <span className="w-12 text-center text-sm font-medium">
        {value} {value === 1 ? 'day' : 'days'}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition-colors hover:border-gray-300 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
