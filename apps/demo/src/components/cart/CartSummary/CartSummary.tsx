import { CartItem } from '@demo/components/cart/CartItem/CartItem';
import { Button } from '@demo/components/ui/Button/Button';
import { formatCurrency } from '@demo/lib/formatCurrency';
import { selectItemsCount, selectTotalPrice, useCartStore } from '@demo/stores/cartStore';
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
          className="size-6 text-gray-400 transition-colors hover:text-gray-600"
        >
          ✕
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
  const navigate = useNavigate();

  const handleProceed = () => {
    onClose?.();
    navigate('/verify');
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

        <div className="mt-4 flex flex-col gap-2">
          <Button fullWidth onClick={handleProceed}>
            Proceed to Verification
          </Button>
          <Button variant="secondary" fullWidth onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </>
  );
}
