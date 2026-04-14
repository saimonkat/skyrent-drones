import { type ReactNode, createContext, useReducer } from 'react';

import type {
  AddressFormResult,
  IdentityVerificationContextValue,
  PhoneInputResult,
  SelfieCaptureResult,
} from '@sdk/types';

interface State {
  currentStep: number;
  selfie: SelfieCaptureResult | null;
  phone: PhoneInputResult | null;
  address: AddressFormResult | null;
}

type Action =
  | { type: 'SET_SELFIE'; payload: SelfieCaptureResult }
  | { type: 'SET_PHONE'; payload: PhoneInputResult }
  | { type: 'SET_ADDRESS'; payload: AddressFormResult }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'RESET' }
  | { type: 'RETRY' };

const TOTAL_STEPS = 3;

const initialState: State = {
  currentStep: 0,
  selfie: null,
  phone: null,
  address: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SELFIE':
      return { ...state, selfie: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1) };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case 'GO_TO_STEP':
      return { ...state, currentStep: Math.max(0, Math.min(action.payload, TOTAL_STEPS - 1)) };
    case 'RESET':
      return initialState;
    case 'RETRY':
      return { ...state, selfie: null, currentStep: 0 };
  }
}

export const IdentityVerificationContext = createContext<IdentityVerificationContextValue | null>(
  null,
);

interface IdentityVerificationProviderProps {
  children: ReactNode;
}

export function IdentityVerificationProvider({ children }: IdentityVerificationProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue: IdentityVerificationContextValue = {
    currentStep: state.currentStep,
    selfie: state.selfie,
    phone: state.phone,
    address: state.address,
    setSelfie: (data) => dispatch({ type: 'SET_SELFIE', payload: data }),
    setPhone: (data) => dispatch({ type: 'SET_PHONE', payload: data }),
    setAddress: (data) => dispatch({ type: 'SET_ADDRESS', payload: data }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    goToStep: (step) => dispatch({ type: 'GO_TO_STEP', payload: step }),
    isComplete: !!(state.selfie && state.phone && state.address),
    reset: () => dispatch({ type: 'RESET' }),
    retry: () => dispatch({ type: 'RETRY' }),
  };

  return (
    <IdentityVerificationContext.Provider value={contextValue}>
      {children}
    </IdentityVerificationContext.Provider>
  );
}
