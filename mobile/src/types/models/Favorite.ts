export type FavoriteProduct = {
  id: number;            // favorite id
  productId: number;
  name: string;
  thumbnail?: string | null;
  price?: number | null;
  currency?: 'LBP'|'USD' | null;
  vendorId?: number | null;
  vendorName?: string | null;
  createdAt: string;
};

export type FavoriteVendor = {
  id: number;            // favorite id
  vendorId: number;
  vendorName: string;
  logo?: string | null;
  createdAt: string;
};

