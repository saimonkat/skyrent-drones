import type { CartItem, Drone } from '@demo/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  addItem: (drone: Drone, days: number) => void;
  removeItem: (droneId: string) => void;
  updateDays: (droneId: string, days: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (drone, days) =>
        set((state) => {
          const existing = state.items.find((item) => item.drone.id === drone.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.drone.id === drone.id ? { ...item, rentalDays: days } : item,
              ),
            };
          }
          return {
            items: [...state.items, { drone, rentalDays: days }],
          };
        }),

      removeItem: (droneId) =>
        set((state) => ({
          items: state.items.filter((item) => item.drone.id !== droneId),
        })),

      updateDays: (droneId, days) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.drone.id === droneId ? { ...item, rentalDays: days } : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'skyrent-cart' },
  ),
);

export const selectTotalPrice = (state: CartStore) => {
  let total = 0;
  for (const item of state.items) {
    total += item.drone.pricePerDay * item.rentalDays;
  }
  return total;
};

export const selectItemsCount = (state: CartStore) => state.items.length;
