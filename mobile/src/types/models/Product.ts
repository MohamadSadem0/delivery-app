export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: 'LBP' | 'USD' | string;
  imageUrl?: string | null;
  vendorId?: number | null;
  categoryIds?: number[];
  stock?: number | null;
};
