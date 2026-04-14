import './styles/theme.css';

export const SDK_VERSION = '0.1.0';

export { SelfieCapture } from './components/SelfieCapture/SelfieCapture';
export { PhoneInput } from './components/PhoneInput/PhoneInput';
export { AddressForm } from './components/AddressForm/AddressForm';
export { IdentityVerificationFlow } from './components/IdentityVerificationFlow/IdentityVerificationFlow';

export { IdentityVerificationProvider } from './context/IdentityVerificationProvider';
export { useIdentityVerification } from './context/useIdentityVerification';

export { getIdentityData } from './core/getIdentityData';

export { addressSchema } from './schemas/address.schema';
export { phoneSchema } from './schemas/phone.schema';

export type {
  AddressData,
  AddressFormProps,
  AddressFormResult,
  Country,
  IdentityData,
  IdentityVerificationContextValue,
  IdentityVerificationFlowProps,
  IdentityVerificationResult,
  PhoneInputProps,
  PhoneInputResult,
  SelfieCaptureProps,
  SelfieCaptureResult,
  VerificationStatus,
} from './types';
