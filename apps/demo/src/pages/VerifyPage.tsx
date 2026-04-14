import '@skyrent/identity-sdk/styles';

import { IdentityVerificationFlow } from '@skyrent/identity-sdk';
import type { IdentityVerificationResult } from '@skyrent/identity-sdk';

export function VerifyPage() {
  const handleComplete = (result: IdentityVerificationResult) => {
    console.warn('Verification complete:', result);
  };

  const handleFail = (result: IdentityVerificationResult) => {
    console.warn('Verification failed:', result);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Identity Verification</h1>
      <p className="mt-2 text-gray-600">Complete verification before checkout.</p>
      <div className="mt-6">
        <IdentityVerificationFlow onComplete={handleComplete} onFail={handleFail} />
      </div>
    </div>
  );
}
