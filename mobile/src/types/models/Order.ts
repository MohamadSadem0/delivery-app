import type { OrderItem } from './OrderItem';
import type { Address } from './Address';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type Order = {
  id: number;
  code?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: string; // 'LBP' | 'USD'
  address: Address;
  createdAt: string; // ISO
  vendorId?: number | null;
};
