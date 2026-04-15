import type { IdentityVerificationResult } from '@skyrent/identity-sdk';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VerificationStore {
  result: IdentityVerificationResult | null;
  setResult: (result: IdentityVerificationResult) => void;
  clearVerification: () => void;
}

export const useVerificationStore = create<VerificationStore>()(
  persist(
    (set) => ({
      result: null,
      setResult: (result) => set({ result }),
      clearVerification: () => set({ result: null }),
    }),
    { name: 'skyrent-verification' },
  ),
);

export const selectIsVerified = (state: VerificationStore) =>
  state.result !== null && state.result.status === 'verified';
