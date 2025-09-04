import type { Middleware } from '@reduxjs/toolkit';
import { linkReceived } from '@/features/deeplinks/deepLinksSlice';
export const deepLinkMiddleware: Middleware = _store => next => action => {
  if ((action as any).type === linkReceived.type) {
    // place for analytics / breadcrumbs
  }
  return next(action);
};

