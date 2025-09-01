import type { CourierLocation } from '@/types/models/Courier';

export type OrderTrackPoint = {
  lat: number;
  lng: number;
  ts: string; // ISO
};

export type OrderTrackState = {
  orderId?: number;
  courier?: { id: number } | null;
  lastLocation?: CourierLocation | null;
  path: OrderTrackPoint[];
  status?: string;
  loading: boolean;
  error?: string;
};
