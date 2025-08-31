import { combineReducers } from '@reduxjs/toolkit';
import app from '@/features/app/appSlice';
import auth from '@/features/auth/authSlice';
import catalog from '@/features/catalog/catalogSlice';
import cart from '@/features/cart/cartSlice';
import orders from '@/features/orders/ordersSlice';
import vendors from '@/features/vendors/vendorsSlice';
import favorites from '@/features/favorites/favoritesSlice';
import profile from '@/features/account/profileSlice';
import addresses from '@/features/addresses/addressesSlice';
import preferences from '@/features/preferences/preferencesSlice';

const rootReducer = combineReducers({
  app,
  auth,
  catalog,
  cart,
  orders,
  vendors,
  favorites,
  profile,
  addresses,
  preferences,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
