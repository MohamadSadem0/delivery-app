import type { LatLng } from '@/types/models/Tracking';
export function haversineMeters(a: LatLng, b: LatLng) {
  const R = 6371000;
  const dLat = (b.latitude - a.latitude) * Math.PI / 180;
  const dLon = (b.longitude - a.longitude) * Math.PI / 180;
  const s1 = Math.sin(dLat/2), s2 = Math.sin(dLon/2);
  const lat1 = a.latitude * Math.PI / 180, lat2 = b.latitude * Math.PI / 180;
  const c = 2 * Math.asin(Math.sqrt(s1*s1 + Math.cos(lat1)*Math.cos(lat2)*s2*s2));
  return R * c;
}
