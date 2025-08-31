export type Promotion = {
  id: number;
  title: string;
  subtitle?: string | null;
  bannerUrl?: string | null;
  deepLink?: string | null; // e.g., deliveryapp://categories/1
  description?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  active?: boolean;
};
