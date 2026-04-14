import { DroneCard } from '@demo/components/catalog/DroneCard/DroneCard';
import { SkeletonCard } from '@demo/components/catalog/SkeletonCard/SkeletonCard';
import type { DroneGridProps } from './types';

export function DroneGrid({ drones, loading }: DroneGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (drones.length === 0) {
    return <p className="py-12 text-center text-gray-500">No drones available</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {drones.map((drone) => (
        <DroneCard key={drone.id} drone={drone} />
      ))}
    </div>
  );
}
