import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

import type { Country } from '@sdk/types';
import { detectCountryByTimezone } from './helpers/detectCountryByTimezone';
import { getCountryName } from './helpers/getCountryName';
import { getFlag } from './helpers/getFlag';

export const COUNTRIES: Country[] = getCountries()
  .map((code) => ({
    code,
    name: getCountryName(code),
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: getFlag(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function detectDefaultCountry(): string {
  const byTimezone = detectCountryByTimezone();
  if (byTimezone && COUNTRIES.some((country) => country.code === byTimezone)) {
    return byTimezone;
  }

  if (typeof navigator === 'undefined') {
    return 'US';
  }

  const locales = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const locale of locales) {
    const parts = locale.split('-');
    const regionCode = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';

    if (regionCode && COUNTRIES.some((country) => country.code === regionCode)) {
      return regionCode;
    }
  }

  return 'US';
}
