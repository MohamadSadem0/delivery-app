import type { RootState } from '@/store';

export const selectTags = (s: RootState) => s.tags.list;
export const selectTagsStatus = (s: RootState) => s.tags.status;
