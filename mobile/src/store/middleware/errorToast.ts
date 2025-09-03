import { Middleware, Action } from '@reduxjs/toolkit';  // Use Action from Redux Toolkit
import { Toast } from '@/lib/toast';

// Shows a toast when an async thunk is rejected and a payload.message exists
export const errorToastMiddleware: Middleware = _store => next => (action: Action) => {
  if (action?.type?.endsWith('/rejected')) {
    const msg = action?.payload?.message || action?.error?.message;
    if (msg) Toast.show(msg, 'error');
  }
  return next(action);
};
