import type { Country } from '../../types';

export interface CountryCodeSelectProps {
  value: string;
  onChange: (countryCode: string) => void;
  countries: Country[];
}
