import { SDK_VERSION } from '@skyrent/identity-sdk';

export function CatalogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Drone Catalog</h1>
      <p className="mt-2 text-gray-600">Browse our selection of filming and cargo drones.</p>
      <p className="mt-4 text-sm text-gray-400">SDK v{SDK_VERSION}</p>
    </div>
  );
}
