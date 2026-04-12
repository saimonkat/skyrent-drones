import '@skyrent/identity-sdk/styles';

import { SelfieCapture } from '@skyrent/identity-sdk';
import type { SelfieCaptureResult } from '@skyrent/identity-sdk';

export function VerifyPage() {
  const handleCapture = (result: SelfieCaptureResult) => {
    console.warn('Selfie captured:', result);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Identity Verification</h1>
      <p className="mt-2 text-gray-600">Complete verification before checkout.</p>
      <div className="mt-6">
        <SelfieCapture onCapture={handleCapture} />
      </div>
    </div>
  );
}
