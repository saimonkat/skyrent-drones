import { CartItem } from '@demo/components/cart/CartItem/CartItem';
import { Button } from '@demo/components/ui/Button/Button';
import { VerificationModal } from '@demo/components/verification/VerificationModal/VerificationModal';
import { VerificationResult } from '@demo/components/verification/VerificationResult/VerificationResult';
import CheckIcon from '@demo/icons/check.svg?react';
import XIcon from '@demo/icons/x.svg?react';
import { formatCurrency } from '@demo/lib/formatCurrency';
import { selectItemsCount, selectTotalPrice, useCartStore } from '@demo/stores/cartStore';
import { selectIsVerified, useVerificationStore } from '@demo/stores/verificationStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartSummaryProps } from './types';

function CartHeader({ onClose }: CartSummaryProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">Cart</h2>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 size-6 flex justify-center items-center text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close cart"
        >
          <XIcon width={20} height={20} />
        </button>
      )}
    </div>
  );
}

export function CartSummary({ onClose }: CartSummaryProps) {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const itemsCount = useCartStore(selectItemsCount);
  const clearCart = useCartStore((state) => state.clearCart);
  const verificationResult = useVerificationStore((state) => state.result);
  const isVerified = useVerificationStore(selectIsVerified);
  const clearVerification = useVerificationStore((state) => state.clearVerification);
  const navigate = useNavigate();

  const [verifyOpen, setVerifyOpen] = useState(false);

  const handleProceedToCheckout = () => {
    onClose?.();
    navigate('/checkout');
  };

  const handleRetry = () => {
    clearVerification();
    setVerifyOpen(true);
  };

  const handleBackToCatalog = () => {
    onClose?.();
    navigate('/');
  };

  if (itemsCount === 0) {
    return (
      <>
        <CartHeader onClose={onClose} />
        <div className="mt-5 rounded-xl bg-white p-5 shadow-sm">
          <p className="text-center text-gray-500">Your cart is empty</p>
        </div>
      </>
    );
  }

  return (
    <>
      <CartHeader onClose={onClose} />
      <div className="mt-5 rounded-xl bg-white py-3 px-5 shadow-sm">
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <CartItem key={item.drone.id} item={item} />
          ))}
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(totalPrice)}</span>
          </div>
        </div>

        {isVerified && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
            <CheckIcon width={16} height={16} />
            <span>Identity verified — {verificationResult?.score}/100</span>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {isVerified ? (
            <Button
              fullWidth
              data-qa="proceed-to-checkout-button"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button fullWidth data-qa="verify-identity-button" onClick={() => setVerifyOpen(true)}>
              Verify Identity
            </Button>
          )}
          <Button
            variant="secondary"
            fullWidth
            data-qa="clear-cart-button"
            onClick={() => {
              clearCart();
              clearVerification();
            }}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      {verificationResult && !isVerified && (
        <div className="mt-4">
          <VerificationResult
            result={verificationResult}
            onRetry={handleRetry}
            onProceed={handleBackToCatalog}
          />
        </div>
      )}

      <VerificationModal open={verifyOpen} onClose={() => setVerifyOpen(false)} />
    </>
  );
}
