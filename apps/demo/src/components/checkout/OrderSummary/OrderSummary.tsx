import { formatCurrency } from '@demo/lib/formatCurrency';
import type { OrderSummaryProps } from './types';

export function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

      <div className="mt-4">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-3 text-sm">
          <span className="font-medium text-gray-500">Drone</span>
          <span className="font-medium text-gray-500 text-right">Days</span>
          <span className="font-medium text-gray-500 text-right">Rate</span>
          <span className="font-medium text-gray-500 text-right">Total</span>

          {items.map((item) => {
            const subtotal = item.drone.pricePerDay * item.rentalDays;
            return (
              <div key={item.drone.id} className="col-span-4 grid grid-cols-subgrid">
                <div className="flex items-center gap-3">
                  <img
                    src={item.drone.imageUrl}
                    alt={item.drone.name}
                    className="size-10 shrink-0 rounded-lg object-cover"
                  />
                  <span className="font-medium text-gray-900">{item.drone.name}</span>
                </div>
                <span className="flex items-center justify-end text-gray-600">
                  {item.rentalDays}
                </span>
                <span className="flex items-center justify-end text-gray-600">
                  {formatCurrency(item.drone.pricePerDay)}
                </span>
                <span className="flex items-center justify-end font-medium text-gray-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
