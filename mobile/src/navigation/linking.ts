import Constants from 'expo-constants';
import type { LinkingOptions } from 'expo-router';
import { APP_SCHEME } from '@/constants/config';

/**
 * Minimal linking config; Expo Router can derive a lot automatically.
 * We keep this to document the scheme and potential prefixes.
 */
export const prefixes = [`${APP_SCHEME}://`];

export const linking: LinkingOptions<{}> = {
  prefixes,
  config: {
    screens: {
      '(tabs)': {
        screens: {
          home: 'home',
          search: 'search',
          cart: 'cart',
          orders: 'orders',
          profile: 'profile',
        },
      },
      'catalog/product/[id]': 'product/:id',
      'delivery/track/[orderId]': 'track/:orderId',
    },
  },
};
