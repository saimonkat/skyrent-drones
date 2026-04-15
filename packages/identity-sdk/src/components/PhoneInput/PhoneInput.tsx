import clsx from 'clsx';
import { ParseError, parsePhoneNumberWithError } from 'libphonenumber-js';
import type { ClipboardEvent } from 'react';
import { useCallback, useState } from 'react';

import { Button } from '@sdk/components/ui/Button/Button';
import { Input } from '@sdk/components/ui/Input/Input';
import { phoneSchema } from '@sdk/schemas/phone.schema';

import type { PhoneInputProps } from '@sdk/types';
import styles from './PhoneInput.module.css';
import { CountryCodeSelect } from './components/CountryCodeSelect/CountryCodeSelect';
import { COUNTRIES } from './data';
import { detectDefaultCountry } from './helpers/detectDefaultCountry';
import { parseDefaultPhone } from './helpers/parseDefaultPhone';
import { parsePastedPhone } from './helpers/parsePastedPhone';

export function PhoneInput({
  onSubmit,
  defaultCountry,
  defaultPhone,
  submitButton = 'Continue',
  className,
}: PhoneInputProps) {
  const parsedDefault = parseDefaultPhone(defaultPhone);
  const [selectedCountry, setSelectedCountry] = useState(
    parsedDefault?.country ?? defaultCountry ?? detectDefaultCountry(COUNTRIES),
  );
  const [phoneNumber, setPhoneNumber] = useState(parsedDefault?.nationalNumber ?? '');
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

  const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

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
    <form
      className={clsx(styles.container, className)}
      onSubmit={handleFormSubmit}
      noValidate
      data-qa="phone-input"
    >
      <div className={styles.inputRow}>
        <CountryCodeSelect
          value={selectedCountry}
          onChange={handleCountryChange}
          countries={COUNTRIES}
        />
        <Input
          autoFocus
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
          aria-describedby={error ? 'phone-error' : undefined}
          error={!!error}
        />
      </div>
      {error && (
        <p id="phone-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
      <Button type="submit" className={styles.submit} data-qa="phone-submit-button">
        {submitButton}
      </Button>
    </form>
  );
}
