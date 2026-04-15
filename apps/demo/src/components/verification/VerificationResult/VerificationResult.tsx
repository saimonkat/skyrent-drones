import { Button } from '@demo/components/ui/Button/Button';
import CheckCircleIcon from '@demo/icons/check-circle.svg?react';
import XCircleIcon from '@demo/icons/x-circle.svg?react';
import { cn } from '@demo/lib/cn';
import type { VerificationResultProps } from './types';

export function VerificationResult({ result, onRetry, onProceed }: VerificationResultProps) {
  const isVerified = result.status === 'verified';

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex size-10 items-center justify-center rounded-full',
            isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
          )}
        >
          {isVerified ? (
            <CheckCircleIcon width={20} height={20} />
          ) : (
            <XCircleIcon width={20} height={20} />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isVerified ? 'Identity Verified' : 'Verification Failed'}
          </h3>
          <p className="text-sm text-gray-500">Score: {result.score}/100</p>
        </div>
      </div>

      {isVerified && (
        <div className="mt-4 flex items-start gap-4">
          <img
            src={result.selfieUrl}
            alt="Selfie"
            className="size-16 shrink-0 rounded-full object-cover"
          />
          <div className="text-sm text-gray-600">
            <p>{result.phone}</p>
            <p className="mt-1">
              {result.address.street}, {result.address.city}
              {result.address.state && `, ${result.address.state}`}
            </p>
            <p>
              {result.address.postalCode}, {result.address.country}
            </p>
          </div>
        </div>
      )}

      {!isVerified && (
        <p className="mt-4 text-sm text-gray-500">
          Your identity could not be verified at this time. You can try again with a new selfie.
        </p>
      )}

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              isVerified ? 'bg-green-500' : 'bg-red-500',
            )}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        {isVerified ? (
          <Button fullWidth onClick={onProceed}>
            Proceed to Checkout
          </Button>
        ) : (
          <>
            <Button fullWidth onClick={onRetry}>
              Try Again
            </Button>
            <Button variant="secondary" fullWidth onClick={onProceed}>
              Back to Catalog
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
