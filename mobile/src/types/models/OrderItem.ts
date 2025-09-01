export type OrderItem = {
  productId: number;
  name: string;
  imageUrl?: string | null;
  unitPrice: number;
  qty: number;
  currency: string;
};
