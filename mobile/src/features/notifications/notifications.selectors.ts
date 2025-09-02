import type { RootState } from '@/store';
export const selectInbox = (s: RootState) => s.notifications.inbox.items;
export const selectInboxStatus = (s: RootState) => s.notifications.inbox.status;
export const selectUnseenCount = (s: RootState) => s.notifications.unseen;
export const selectRegistrationStatus = (s: RootState) => s.notifications.registration.status;
