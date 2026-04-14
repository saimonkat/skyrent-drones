import type { Drone } from '@demo/types';
import { beforeEach, describe, expect, it } from 'vitest';
import { selectItemsCount, selectTotalPrice, useCartStore } from './cartStore';

const mavic: Drone = {
  id: 'dji-mavic-3-cine',
  name: 'DJI Mavic 3 Cine',
  category: 'filming',
  description: 'Test drone',
  imageUrl: '/drones/dji-mavic-3-cine.jpg',
  pricePerDay: 150,
  cameraResolution: '5.1K',
  specs: {},
};

const inspire: Drone = {
  id: 'dji-inspire-3',
  name: 'DJI Inspire 3',
  category: 'filming',
  description: 'Test drone',
  imageUrl: '/drones/dji-inspire-3.jpg',
  pricePerDay: 350,
  cameraResolution: '8K',
  specs: {},
};

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  describe('addItem', () => {
    it('adds a new item to the cart', () => {
      useCartStore.getState().addItem(mavic, 3);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].drone.id).toBe('dji-mavic-3-cine');
      expect(items[0].rentalDays).toBe(3);
    });

    it('updates rental days if drone is already in cart', () => {
      useCartStore.getState().addItem(mavic, 3);
      useCartStore.getState().addItem(mavic, 5);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].rentalDays).toBe(5);
    });

    it('adds multiple different drones', () => {
      useCartStore.getState().addItem(mavic, 2);
      useCartStore.getState().addItem(inspire, 4);

      expect(useCartStore.getState().items).toHaveLength(2);
    });
  });

  describe('removeItem', () => {
    it('removes an item by drone id', () => {
      useCartStore.getState().addItem(mavic, 3);
      useCartStore.getState().addItem(inspire, 2);

      useCartStore.getState().removeItem('dji-mavic-3-cine');

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].drone.id).toBe('dji-inspire-3');
    });
  });

  describe('updateDays', () => {
    it('updates rental days for a specific drone', () => {
      useCartStore.getState().addItem(mavic, 3);

      useCartStore.getState().updateDays('dji-mavic-3-cine', 7);

      expect(useCartStore.getState().items[0].rentalDays).toBe(7);
    });
  });

  describe('clearCart', () => {
    it('removes all items', () => {
      useCartStore.getState().addItem(mavic, 3);
      useCartStore.getState().addItem(inspire, 2);

      useCartStore.getState().clearCart();

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('selectTotalPrice', () => {
    it('returns 0 for empty cart', () => {
      expect(selectTotalPrice(useCartStore.getState())).toBe(0);
    });

    it('calculates total correctly', () => {
      useCartStore.getState().addItem(mavic, 3);
      useCartStore.getState().addItem(inspire, 2);

      expect(selectTotalPrice(useCartStore.getState())).toBe(150 * 3 + 350 * 2);
    });
  });

  describe('selectItemsCount', () => {
    it('returns 0 for empty cart', () => {
      expect(selectItemsCount(useCartStore.getState())).toBe(0);
    });

    it('returns correct count', () => {
      useCartStore.getState().addItem(mavic, 1);
      useCartStore.getState().addItem(inspire, 1);

      expect(selectItemsCount(useCartStore.getState())).toBe(2);
    });
  });
});
