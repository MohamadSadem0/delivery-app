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
import payments from '@/features/payments/paymentsSlice';
import tracking from '@/features/orders/trackingSlice';
import notifications from '@/features/notifications/notificationsSlice';
import categories from '@/features/categories/categoriesSlice';
import promotions from '@/features/promotions/promotionsSlice';
import tags from '@/features/tags/tagsSlice';
import coupons from '@/features/coupons/couponsSlice';
import promos from '@/features/promos/promosSlice';

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
  payments,
  tracking,
  notifications,
  categories,
  tags,
  coupons,
  promos,
  promotions,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

