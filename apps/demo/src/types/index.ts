export type DroneCategory = 'filming' | 'cargo';

export type CategoryFilter = DroneCategory | 'all';

export interface Drone {
  id: string;
  name: string;
  category: DroneCategory;
  description: string;
  imageUrl: string;
  pricePerDay: number;
  cameraResolution?: string;
  loadCapacityKg?: number;
  specs: Record<string, string>;
}

export interface CartItem {
  drone: Drone;
  rentalDays: number;
}
