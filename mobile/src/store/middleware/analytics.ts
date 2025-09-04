import type { Middleware } from '@reduxjs/toolkit';

/**
 * Very small analytics middleware.
 * Dispatch actions with `meta.analytics = { event: 'EventName', props: {...} }` to log.
 */
const analytics: Middleware = () => next => action => {
  const hasAnalytics = (action as any)?.meta?.analytics;
  if (hasAnalytics) {
    // eslint-disable-next-line no-console
    console.log('[analytics]', (action as any).meta.analytics);
  }
  return next(action);
};

export default analytics;

