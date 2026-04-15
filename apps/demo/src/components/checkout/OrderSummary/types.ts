import type { CartItem } from '@demo/types';

export interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}
