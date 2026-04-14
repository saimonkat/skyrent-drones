import type { Country } from '@sdk/types';

export interface CountryCodeSelectProps {
  value: string;
  onChange: (countryCode: string) => void;
  countries: Country[];
}
