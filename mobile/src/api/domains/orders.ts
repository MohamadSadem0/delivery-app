import { httpGet, httpPost } from '@/api/client';
import { endpoints } from '@/api/endpoints';
import type { Order, Page, Address, PaymentMethod, ID } from '@/api/domainTypes';

export async function listOrders(params?: { page?: number }): Promise<Page<Order>> {
  return httpGet(endpoints.orders.list, { params });
}

export async function getOrder(orderId: ID): Promise<Order> {
  return httpGet(endpoints.orders.one(orderId));
}

export async function placeOrder(body: { addressId: ID; payment: PaymentMethod; note?: string; scheduledAt?: string }): Promise<Order> {
  return httpPost(endpoints.orders.list, body);
}

export async function requestRefund(orderId: ID, reason: string): Promise<{ success: boolean }> {
  return httpPost(endpoints.orders.refunds(orderId), { reason });
}
