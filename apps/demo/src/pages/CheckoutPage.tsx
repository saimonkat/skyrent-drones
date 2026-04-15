import { CompletionScreen } from '@demo/components/checkout/CompletionScreen/CompletionScreen';
import { OrderSummary } from '@demo/components/checkout/OrderSummary/OrderSummary';
import { Button } from '@demo/components/ui/Button/Button';
import { selectTotalPrice, useCartStore } from '@demo/stores/cartStore';
import { useVerificationStore } from '@demo/stores/verificationStore';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function generateOrderRef(): string {
  return `SR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const result = useVerificationStore((state) => state.result);
  const clearVerification = useVerificationStore((state) => state.clearVerification);
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = useState(false);
  const orderRef = useMemo(() => generateOrderRef(), []);

  const handleCompleteRental = () => {
    clearCart();
    clearVerification();
    setIsCompleted(true);
  };

  const handleBackToCatalog = () => {
    navigate('/');
  };

  if (isCompleted) {
    return <CompletionScreen orderRef={orderRef} onBackToCatalog={handleBackToCatalog} />;
  }

  return (
    <section data-qa="checkout-page">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <OrderSummary items={items} totalPrice={totalPrice} />

        {result && (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Verified Identity</h2>
            <div className="mt-4 flex items-start gap-4">
              <img
                src={result.selfieUrl}
                alt="Selfie"
                className="size-16 shrink-0 rounded-full object-cover"
              />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">{result.phone}</p>
                <p className="mt-1">{result.address.street}</p>
                <p>
                  {result.address.city}
                  {result.address.state && `, ${result.address.state}`} {result.address.postalCode}
                </p>
                <p>{result.address.country}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Verified — {result.score}/100
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Button size="lg" fullWidth data-qa="complete-rental-button" onClick={handleCompleteRental}>
          Complete Rental
        </Button>
      </div>
    </section>
  );
}
