import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, PersistConfig } from 'redux-persist';
import rootReducer from './rootReducer';

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['app', 'cart', 'favorites'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
