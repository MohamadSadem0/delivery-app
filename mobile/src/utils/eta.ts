import { haversineKm } from '@/utils/geo';

export function computeEtaMinutes(distanceKm: number, speedKmh = 25) {
  if (!isFinite(distanceKm) || distanceKm <= 0) return 0;
  return Math.round((distanceKm / speedKmh) * 60);
}

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  return haversineKm(a.lat, a.lng, b.lat, b.lng);
}

