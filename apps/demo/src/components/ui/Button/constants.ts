import type { ButtonVariant } from './types';

const BASE = 'rounded-lg py-2 text-sm font-medium transition-colors';

export const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: `${BASE} bg-blue-600 text-white hover:bg-blue-700`,
  secondary: `${BASE} text-gray-500 hover:text-gray-700`,
  success: `${BASE} bg-green-100 text-green-700`,
};
