/**
 * Route name constants to avoid typos.
 * These map to Expo Router segments.
 */
export const routes = {
  Auth: {
    Login: '/(auth)/login',
    Register: '/(auth)/register',
    Forgot: '/(auth)/forgot-password',
  },
  Tabs: {
    Home: '/(tabs)/home',
    Search: '/(tabs)/search',
    Cart: '/(tabs)/cart',
    Orders: '/(tabs)/orders',
    Profile: '/(tabs)/profile',
  },
  Catalog: {
    Categories: '/catalog/categories',
    Products: '/catalog/products',
    Product: (id: string | number) => `/catalog/product/${id}`,
  },
  Vendor: {
    Index: '/vendor',
    Detail: (id: string | number) => `/vendor/${id}`,
    Products: (id: string | number) => `/vendor/${id}/products`,
  },
  Checkout: {
    Address: '/checkout/address',
    Payment: '/checkout/payment',
    Confirmation: '/checkout/confirmation',
  },
  Delivery: {
    Track: (orderId: string | number) => `/delivery/track/${orderId}`,
  },
  Settings: {
    Notifications: '/settings/notifications',
    Language: '/settings/language',
  },
  Support: {
    Contact: '/support/contact-us',
  },
} as const;

