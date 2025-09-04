export type CourierLocation = {
  lat: number;
  lng: number;
  bearing?: number | null;
  speedKmh?: number | null;
  updatedAt: string; // ISO
};

export type Courier = {
  id: number;
  name?: string | null;
  phone?: string | null;
  vehicle?: 'bike' | 'car' | 'scooter' | 'other';
  location?: CourierLocation | null;
};

