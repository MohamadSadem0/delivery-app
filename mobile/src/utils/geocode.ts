import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';

export async function geocodeSearch(query: string) {
  const res = await axiosInstance.get(endpoints.geocode.search, { params: { q: query } });
  return res.data; // { results: [{ label, latitude, longitude, ... }] }
}

export async function geocodeReverse(lat: number, lng: number) {
  const res = await axiosInstance.get(endpoints.geocode.reverse, { params: { lat, lng } });
  return res.data; // { address: { line1, city, area, governorate } }
}
