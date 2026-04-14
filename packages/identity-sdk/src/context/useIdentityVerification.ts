import { useContext } from 'react';

import type { IdentityVerificationContextValue } from '@sdk/types';
import { IdentityVerificationContext } from './IdentityVerificationProvider';

export function useIdentityVerification(): IdentityVerificationContextValue {
  const ctx = useContext(IdentityVerificationContext);
  if (!ctx) {
    throw new Error('useIdentityVerification must be used within <IdentityVerificationProvider>');
  }
  return ctx;
}
