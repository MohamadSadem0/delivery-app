import type { RootState } from '@/store';

export const selectCatalogStatus = (s: RootState) => s.catalog.status;
export const selectProducts = (s: RootState) => s.catalog.items;
export const selectProductById = (id: number) => (s: RootState) => s.catalog.byId[id] ?? null;
export const selectCategories = (s: RootState) => s.catalog.categories;
export const selectCatalogMeta = (s: RootState) => ({ page: s.catalog.page, pageSize: s.catalog.pageSize, total: s.catalog.total });

