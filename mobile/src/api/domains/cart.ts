import { httpGet, httpPost, httpDelete, httpPatch } from '@/api/client';
import { endpoints } from '@/api/endpoints';
import type { Cart, ID } from '@/api/domainTypes';

export async function getCart(): Promise<Cart> {
  return httpGet(endpoints.cart.root);
}

export async function addItem(body: { productId: ID; quantity: number; options?: Record<string,string> }): Promise<Cart> {
  return httpPost(endpoints.cart.items, body);
}

export async function updateItem(itemId: ID, body: { quantity: number; options?: Record<string,string> }): Promise<Cart> {
  return httpPatch(`${endpoints.cart.items}/${itemId}`, body);
}

export async function removeItem(itemId: ID): Promise<Cart> {
  return httpDelete(`${endpoints.cart.items}/${itemId}`);
}

export async function applyCoupon(code: string): Promise<Cart> {
  return httpPost(`${endpoints.cart.root}/apply-coupon`, { code });
}

export async function clearCart(): Promise<{ success: boolean }> {
  return httpDelete(endpoints.cart.root);
}

