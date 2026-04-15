import type { AddressFormResult, PhoneInputResult, SelfieCaptureResult } from '@sdk/types';
import type { ReactNode } from 'react';

export interface State {
  currentStep: number;
  selfie: SelfieCaptureResult | null;
  phone: PhoneInputResult | null;
  address: AddressFormResult | null;
}

export type Action =
  | { type: 'SET_SELFIE'; payload: SelfieCaptureResult }
  | { type: 'SET_PHONE'; payload: PhoneInputResult }
  | { type: 'SET_ADDRESS'; payload: AddressFormResult }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'RESET' }
  | { type: 'RETRY' };

export interface IdentityVerificationProviderProps {
  children: ReactNode;
}
