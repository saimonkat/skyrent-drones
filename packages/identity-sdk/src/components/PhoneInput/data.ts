import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

import type { Country } from '@sdk/types';
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
