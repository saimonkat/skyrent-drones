import type { Country } from '@sdk/types';
import { detectCountryByTimezone } from './detectCountryByTimezone';

export function detectDefaultCountry(countries: Country[]): string {
  const byTimezone = detectCountryByTimezone();
  if (byTimezone && countries.some((country) => country.code === byTimezone)) {
    return byTimezone;
  }

  if (typeof navigator === 'undefined') {
    return 'US';
  }

  const locales = navigator.languages?.length ? navigator.languages : [navigator.language];

  for (const locale of locales) {
    const parts = locale.split('-');
    const regionCode = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';

    if (regionCode && countries.some((country) => country.code === regionCode)) {
      return regionCode;
    }
  }

  return 'US';
}
