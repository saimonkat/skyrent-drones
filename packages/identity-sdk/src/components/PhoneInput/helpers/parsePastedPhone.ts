import type { Country } from '@sdk/types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function parsePastedPhone(pasted: string, countries: Country[]) {
  const trimmed = pasted.trim();

  if (trimmed.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(trimmed);
    if (parsed?.country && parsed.isValid() && countries.some((c) => c.code === parsed.country)) {
      return { country: parsed.country, phoneNumber: parsed.nationalNumber };
    }
  }

  return { phoneNumber: trimmed.replace(/\D/g, '').replace(/^0+/, '') };
}
