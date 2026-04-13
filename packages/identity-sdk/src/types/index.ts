import type { AddressFormResult } from '../components/AddressForm/types';
import type { PhoneInputResult } from '../components/PhoneInput/types';
import type { SelfieCaptureResult } from '../components/SelfieCapture/types';

export type {
  AddressData,
  AddressFormProps,
  AddressFormResult,
} from '../components/AddressForm/types';
export type { SelfieCaptureResult, SelfieCaptureProps } from '../components/SelfieCapture/types';
export type { PhoneInputProps, PhoneInputResult } from '../components/PhoneInput/types';

export type VerificationStatus = 'verified' | 'failed';

export interface IdentityData {
  selfieUrl: string;
  phone: string;
  address: AddressFormResult['address'];
}

export interface IdentityVerificationResult {
  selfieUrl: string;
  phone: string;
  address: AddressFormResult['address'];
  score: number;
  status: VerificationStatus;
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
