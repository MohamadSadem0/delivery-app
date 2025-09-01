export type Vendor = {
  id: number;
  name: string;
  logoUrl?: string | null;
  coverUrl?: string | null;
  rating?: number | null; // 0..5
  city?: string | null;
  description?: string | null;
};
