export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled' | 'refunded';
export type OrderHistoryFilters = { status?: OrderStatus | null; vendorId?: number | null; fromDate?: string | null; toDate?: string | null; query?: string | null; };
export type OrderRow = { id: number; code?: string; vendorName: string; total: number; currency: string; status: OrderStatus; createdAt: string; };

