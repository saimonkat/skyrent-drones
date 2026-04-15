import { useCartStore } from '@demo/stores/cartStore';
import { selectIsVerified, useVerificationStore } from '@demo/stores/verificationStore';
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';

export function VerificationGuard({ children }: { children: React.ReactNode }) {
  const isVerified = useVerificationStore(selectIsVerified);
  const items = useCartStore((state) => state.items);
  const wasAuthorized = useRef(false);

  if (isVerified && items.length > 0) {
    wasAuthorized.current = true;
  }

  if (!wasAuthorized.current) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
