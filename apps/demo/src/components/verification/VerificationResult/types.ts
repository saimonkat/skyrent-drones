import type { IdentityVerificationResult } from '@skyrent/identity-sdk';

export interface VerificationResultProps {
  result: IdentityVerificationResult;
  onRetry: () => void;
  onProceed: () => void;
}
