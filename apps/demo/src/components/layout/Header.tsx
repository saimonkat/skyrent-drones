import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          SkyRent Drones
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Catalog
          </Link>
          <Link to="/verify" className="text-sm text-gray-600 hover:text-gray-900">
            Verify
          </Link>
          <Link to="/checkout" className="text-sm text-gray-600 hover:text-gray-900">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
