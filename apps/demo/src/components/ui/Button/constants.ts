import type { ButtonSize, ButtonVariant } from './types';

const BASE = 'rounded-lg font-medium transition-colors';

export const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: `${BASE} bg-blue-600 text-white hover:bg-blue-700`,
  secondary: `${BASE} text-gray-500 hover:text-gray-700`,
  success: `${BASE} bg-green-100 text-green-700`,
};

export const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};
