import { RentalDaysInput } from '@demo/components/catalog/RentalDaysInput/RentalDaysInput';
import { Button } from '@demo/components/ui/Button/Button';
import { formatCurrency } from '@demo/lib/formatCurrency';
import { useCartDrawerStore } from '@demo/stores/cartDrawerStore';
import { useCartStore } from '@demo/stores/cartStore';
import { useEffect, useState } from 'react';
import type { DroneCardProps } from './types';

export function DroneCard({ drone }: DroneCardProps) {
  const [localDays, setLocalDays] = useState(1);
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateDays = useCartStore((state) => state.updateDays);
  const openCart = useCartDrawerStore((state) => state.open);

  const cartItem = cartItems.find((item) => item.drone.id === drone.id);
  const inCart = !!cartItem;
  const days = inCart ? cartItem.rentalDays : localDays;

  useEffect(() => {
    if (!inCart) {
      setLocalDays(1);
    }
  }, [inCart]);

  const handleDaysChange = (value: number) => {
    if (inCart) {
      updateDays(drone.id, value);
    } else {
      setLocalDays(value);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="aspect-4/3 overflow-hidden bg-gray-100">
        <img src={drone.imageUrl} alt={drone.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{drone.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{drone.description}</p>
        </div>

        <div className="text-sm text-gray-600">
          {drone.category === 'filming' && drone.cameraResolution && (
            <span>{drone.cameraResolution} Camera</span>
          )}
          {drone.category === 'cargo' && drone.loadCapacityKg && (
            <span>Load: {drone.loadCapacityKg} kg</span>
          )}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
          {Object.entries(drone.specs).map(([key, value]) => (
            <span key={key}>
              {key}: {value}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between h-8">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(drone.pricePerDay)}/day
            </span>
            <RentalDaysInput value={days} onChange={handleDaysChange} />
          </div>

          <Button
            variant={inCart ? 'success' : 'primary'}
            fullWidth
            onClick={() => {
              if (inCart) {
                openCart();
              } else {
                addItem(drone, days);
                openCart();
              }
            }}
          >
            {inCart ? 'In Cart ✓' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}
