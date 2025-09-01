export type Review = {
  id: number;
  vendorId: number;
  orderId?: number | null;
  userId?: number | null;
  userName?: string | null;
  rating: number; // 1..5
  comment?: string | null;
  photos?: string[] | null;
  createdAt: string; // ISO
};
