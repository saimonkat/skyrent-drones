import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function parseDefaultPhone(phone?: string) {
  if (!phone) {
    return null;
  }
  const parsed = parsePhoneNumberFromString(phone);
  if (parsed?.country && parsed.nationalNumber) {
    return { country: parsed.country, nationalNumber: parsed.nationalNumber };
  }
  return null;
}
