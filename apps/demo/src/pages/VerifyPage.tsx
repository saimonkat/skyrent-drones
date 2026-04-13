import '@skyrent/identity-sdk/styles';

import { PhoneInput, SelfieCapture } from '@skyrent/identity-sdk';
import type { PhoneInputResult, SelfieCaptureResult } from '@skyrent/identity-sdk';

export function VerifyPage() {
  const handleCapture = (result: SelfieCaptureResult) => {
    console.warn('Selfie captured:', result);
  };

  const handlePhone = (result: PhoneInputResult) => {
    console.warn('Phone submitted:', result);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Identity Verification</h1>
      <p className="mt-2 text-gray-600">Complete verification before checkout.</p>
      <div className="mt-6 max-w-md flex flex-col gap-6">
        <SelfieCapture onCapture={handleCapture} />
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Phone Number</h2>
          <PhoneInput onSubmit={handlePhone} />
        </section>
      </div>
    </div>
  );
}
