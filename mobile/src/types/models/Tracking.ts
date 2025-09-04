export type LatLng = { latitude: number; longitude: number };
export type DriverLocation = LatLng & { heading?: number | null; speedKph?: number | null; updatedAt: string };
export type Waypoint = LatLng & { type: 'vendor' | 'customer' | 'driver'; label?: string | null };

export type RouteGeometry =
  | { type: 'polyline'; encoded: string }
  | { type: 'positions'; coords: LatLng[] };

export type OrderTrackingSnapshot = {
  orderId: number;
  vendor: LatLng;
  customer: LatLng;
  driver?: DriverLocation | null;
  route?: RouteGeometry | null;
  distanceMeters?: number | null;
  etaSeconds?: number | null;
  status?: 'preparing' | 'on_the_way' | 'arriving' | 'delivered' | 'unknown';
  updatedAt: string; // ISO
};

