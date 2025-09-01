import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { FavProductsResponse, FavVendorsResponse, ToggleResponse } from './favorites.types';

export async function apiListFavProducts(): Promise<FavProductsResponse> {
  const res = await axiosInstance.get(endpoints.favorites.products);
  return res.data;
}

export async function apiListFavVendors(): Promise<FavVendorsResponse> {
  const res = await axiosInstance.get(endpoints.favorites.vendors);
  return res.data;
}

export async function apiAddFavProduct(productId: number): Promise<ToggleResponse> {
  const res = await axiosInstance.post(endpoints.favorites.products, { productId });
  return res.data;
}

export async function apiRemoveFavProduct(favIdOrProductId: number): Promise<ToggleResponse> {
  const res = await axiosInstance.delete(endpoints.favorites.product(favIdOrProductId));
  return res.data;
}

export async function apiAddFavVendor(vendorId: number): Promise<ToggleResponse> {
  const res = await axiosInstance.post(endpoints.favorites.vendors, { vendorId });
  return res.data;
}

export async function apiRemoveFavVendor(favIdOrVendorId: number): Promise<ToggleResponse> {
  const res = await axiosInstance.delete(endpoints.favorites.vendor(favIdOrVendorId));
  return res.data;
}
