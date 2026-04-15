import { RentalDaysInput } from '@demo/components/catalog/RentalDaysInput/RentalDaysInput';
import TrashIcon from '@demo/icons/trash.svg?react';
import { formatCurrency } from '@demo/lib/formatCurrency';
import { useCartStore } from '@demo/stores/cartStore';
import type { CartItemProps } from './types';

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateDays = useCartStore((state) => state.updateDays);

  const total = item.drone.pricePerDay * item.rentalDays;

  return (
    <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
      <img
        src={item.drone.imageUrl}
        alt={item.drone.name}
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1 pr-8 sm:pr-0">
        <p className="font-medium text-gray-900 truncate">{item.drone.name}</p>
        <p className="text-sm text-gray-500">{formatCurrency(item.drone.pricePerDay)}/day</p>
      </div>

      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:flex-1">
        <RentalDaysInput
          value={item.rentalDays}
          onChange={(days) => updateDays(item.drone.id, days)}
        />
        <p className="font-medium text-gray-900 min-w-16 text-right">{formatCurrency(total)}</p>
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.drone.id)}
        className="absolute z-1 right-0 top-5 p-1 text-gray-400 transition-colors hover:text-red-500 sm:static"
      >
        <TrashIcon width={16} height={16} />
      </button>
    </div>
  );
}
