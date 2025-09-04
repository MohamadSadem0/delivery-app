import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';
import { persistedReducer } from './persistedStore';
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger';
import analytics from './middleware/analytics';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist + RN
      immutableCheck: false,
    }).concat(rtkQueryErrorLogger, analytics),
  devTools: __DEV__,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

