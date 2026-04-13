import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

import { getCountryName } from './helpers/getCountryName';
import { getFlag } from './helpers/getFlag';
import type { Country } from './types';

export const COUNTRIES: Country[] = getCountries()
  .map((code) => ({
    code,
    name: getCountryName(code),
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: getFlag(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function detectDefaultCountry(): string {
  if (typeof navigator === 'undefined') {
    return 'US';
  }

  const locale = navigator.language || '';
  const parts = locale.split('-');
  const regionCode = parts.length > 1 ? parts[1].toUpperCase() : '';

  if (regionCode && COUNTRIES.some((country) => country.code === regionCode)) {
    return regionCode;
  }

  return 'US';
}
