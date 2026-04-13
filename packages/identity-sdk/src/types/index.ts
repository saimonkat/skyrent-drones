import type { PhoneInputResult } from '../components/PhoneInput/types';
import type { SelfieCaptureResult } from '../components/SelfieCapture/types';

export type { SelfieCaptureResult, SelfieCaptureProps } from '../components/SelfieCapture/types';
export type { PhoneInputProps, PhoneInputResult } from '../components/PhoneInput/types';

export interface AddressData {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface AddressFormResult {
  address: AddressData;
}

export type VerificationStatus = 'verified' | 'failed';

export interface IdentityData {
  selfieUrl: string;
  phone: string;
  address: AddressData;
}

export interface IdentityVerificationResult {
  selfieUrl: string;
  phone: string;
  address: AddressData;
  score: number;
  status: VerificationStatus;
}

export interface AddressFormProps {
  onSubmit?: (result: AddressFormResult) => void;
  defaultValues?: Partial<AddressData>;
  className?: string;
}

export interface IdentityVerificationFlowProps {
  onComplete?: (result: IdentityVerificationResult) => void;
  onFail?: (result: IdentityVerificationResult) => void;
  className?: string;
}

export interface IdentityVerificationContextValue {
  currentStep: number;
  selfie: SelfieCaptureResult | null;
  phone: PhoneInputResult | null;
  address: AddressFormResult | null;
  setSelfie: (data: SelfieCaptureResult) => void;
  setPhone: (data: PhoneInputResult) => void;
  setAddress: (data: AddressFormResult) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isComplete: boolean;
  reset: () => void;
  retry: () => void;
}
