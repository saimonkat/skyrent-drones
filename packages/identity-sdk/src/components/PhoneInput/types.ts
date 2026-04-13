export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface PhoneInputResult {
  phone: string;
}

export interface PhoneInputProps {
  onSubmit?: (result: PhoneInputResult) => void;
  defaultCountry?: string;
  className?: string;
}
