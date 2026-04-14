import type { Drone, DroneCategory } from '@demo/types';
import dronesData from './drones.json';

const DELAY = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchDrones(): Promise<Drone[]> {
  await delay(DELAY);
  return dronesData as Drone[];
}

export async function fetchDronesByCategory(category: DroneCategory): Promise<Drone[]> {
  await delay(DELAY);
  return (dronesData as Drone[]).filter((drone) => drone.category === category);
}
