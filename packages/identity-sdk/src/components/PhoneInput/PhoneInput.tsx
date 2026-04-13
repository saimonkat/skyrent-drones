import clsx from 'clsx';
import { ParseError, parsePhoneNumberWithError } from 'libphonenumber-js';
import { type ClipboardEvent, useCallback, useState } from 'react';

import { Button } from '@sdk/components/ui/Button/Button';
import { Input } from '@sdk/components/ui/Input/Input';
import { phoneSchema } from '@sdk/schemas/phone.schema';

import styles from './PhoneInput.module.css';
import { CountryCodeSelect } from './components/CountryCodeSelect/CountryCodeSelect';
import { COUNTRIES, detectDefaultCountry } from './constants';
import { parsePastedPhone } from './helpers/parsePastedPhone';
import type { PhoneInputProps } from './types';

export function PhoneInput({ onSubmit, defaultCountry, className }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry || detectDefaultCountry);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setError(null);
  };

  const handlePaste = (ev: ClipboardEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const result = parsePastedPhone(ev.clipboardData.getData('text'), COUNTRIES);

    if (result.country) {
      setSelectedCountry(result.country);
    }

    setPhoneNumber(result.phoneNumber);
    setError(null);
  };

  const handleCountryChange = useCallback((country: string) => {
    setSelectedCountry(country);
    setError(null);
  }, []);

  const handleSubmit = () => {
    const result = phoneSchema.safeParse({ countryCode: selectedCountry, phoneNumber });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const parsed = parsePhoneNumberWithError(phoneNumber, {
        defaultCountry: selectedCountry as never,
      });
      onSubmit?.({ phone: parsed.format('E.164') });
    } catch (error) {
      if (error instanceof ParseError) {
        setError('Invalid phone number for selected country');
      } else {
        throw error;
      }
    }
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.inputRow}>
        <CountryCodeSelect
          value={selectedCountry}
          onChange={handleCountryChange}
          countries={COUNTRIES}
        />
        <Input
          type="tel"
          name="phone"
          autoComplete="tel-national"
          className={styles.input}
          value={phoneNumber}
          onChange={(ev) => handlePhoneChange(ev.target.value)}
          onPaste={handlePaste}
          placeholder="Phone number"
          aria-label="Phone number"
          aria-invalid={!!error}
          error={!!error}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <Button className={styles.submit} onClick={handleSubmit}>
        Continue
      </Button>
    </div>
  );
}
