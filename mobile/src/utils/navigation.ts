import { router } from 'expo-router';
export const navToProduct = (id: number) => router.push(`/products/${id}` as any);
export const navToVendor  = (id: number) => router.push(`/vendors/${id}` as any);
export const navToOrder   = (id: number) => router.push(`/orders/${id}` as any);
