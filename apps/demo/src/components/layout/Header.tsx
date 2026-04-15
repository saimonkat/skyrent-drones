import { CartDrawer } from '@demo/components/cart/CartDrawer/CartDrawer';
import CartIcon from '@demo/icons/cart.svg?react';
import { useCartDrawerStore } from '@demo/stores/cartDrawerStore';
import { selectItemsCount, useCartStore } from '@demo/stores/cartStore';
import { Link } from 'react-router-dom';

export function Header() {
  const itemsCount = useCartStore(selectItemsCount);
  const isCartOpen = useCartDrawerStore((state) => state.isOpen);
  const openCart = useCartDrawerStore((state) => state.open);
  const closeCart = useCartDrawerStore((state) => state.close);

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            SkyRent Drones
          </Link>
          <nav className="flex items-center gap-6">
            <button
              type="button"
              onClick={openCart}
              className="relative text-gray-600 transition-colors hover:text-gray-900"
            >
              <CartIcon width={24} height={24} />
              {itemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                  {itemsCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>
      <CartDrawer open={isCartOpen} onClose={closeCart} />
    </>
  );
}
