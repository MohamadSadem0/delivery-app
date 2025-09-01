import type { Middleware } from '@reduxjs/toolkit';

/**
 * Logs RTK Query rejections with useful details.
 */
export const rtkQueryErrorLogger: Middleware = () => next => action => {
  if (typeof action?.type === 'string' && action.type.endsWith('/rejected')) {
    const { type, error, payload, meta } = action as any;
    // eslint-disable-next-line no-console
    console.warn('[RTKQ rejected]', { type, error, payload, meta });
  }
  return next(action);
};
