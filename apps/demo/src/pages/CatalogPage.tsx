import { CategoryTabs } from '@demo/components/catalog/CategoryTabs/CategoryTabs';
import { DroneGrid } from '@demo/components/catalog/DroneGrid/DroneGrid';
import { fetchDrones, fetchDronesByCategory } from '@demo/data/api';
import type { CategoryFilter, Drone } from '@demo/types';
import { useEffect, useState } from 'react';

export function CatalogPage() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [drones, setDrones] = useState<Drone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const request = category === 'all' ? fetchDrones() : fetchDronesByCategory(category);
    request.then((data) => {
      setDrones(data);
      setLoading(false);
    });
  }, [category]);

  return (
    <section data-qa="catalog-page">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Rent a Drone</h1>
          <p className="mt-1 text-gray-500">
            Professional filming and cargo drones available for daily rental
          </p>
        </div>
        <CategoryTabs activeCategory={category} onChange={setCategory} />
      </div>

      <div className="mt-8">
        <DroneGrid drones={drones} loading={loading} />
      </div>
    </section>
  );
}
