import type { RootState } from '@/store';

export const selectCategories = (s: RootState) => s.categories.list;
export const selectCategoryById = (id: number) => (s: RootState) => s.categories.byId[id] ?? null;
export const selectCategoriesStatus = (s: RootState) => s.categories.status;

