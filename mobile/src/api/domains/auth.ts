export const endpoints = {
  auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    refresh: '/api/v1/auth/refresh',
    logout: '/api/v1/auth/logout',
    me: '/api/v1/auth/me',
  },
  catalog: {
    products: '/api/v1/catalog/products',
    one: (id: string | number) => `/api/v1/catalog/products/${id}`,
  },
  coupons: {
    preview: '/api/v1/coupons/preview',
    apply: '/api/v1/coupons/apply', // Add the missing 'apply' endpoint
    remove: '/api/v1/coupons/remove', // Add the missing 'remove' endpoint
    my: '/api/v1/coupons/my', // Add the missing 'my' endpoint
    validate: '/api/v1/coupons/validate', // Add the missing 'validate' endpoint
  },
  favorites: {
    products: '/api/v1/favorites/products',
    vendors: '/api/v1/favorites/vendors',
    product: (favIdOrProductId: string | number) => `/api/v1/favorites/products/${favIdOrProductId}`,
    vendor: (favIdOrVendorId: string | number) => `/api/v1/favorites/vendors/${favIdOrVendorId}`,
  },
  notifications: {
    registerToken: '/api/v1/notifications/registerToken',
    list: '/api/v1/notifications/list',
    markRead: (id: string | number) => `/api/v1/notifications/markRead/${id}`,
    remove: (id: string | number) => `/api/v1/notifications/remove/${id}`,
    test: '/api/v1/notifications/test',
  },
  orders: {
    list: '/api/v1/orders',
    one: (id: string | number) => `/api/v1/orders/${id}`,
    refunds: (id: string | number) => `/api/v1/orders/${id}/refunds`,
    invoice: (orderId: string | number) => `/api/v1/orders/${orderId}/invoice`,
    create: '/api/v1/orders/create', // Add the missing 'create' endpoint
    cancel: (orderId: string | number) => `/api/v1/orders/${orderId}/cancel`, // Add the 'cancel' endpoint
  },
  wallet: {
    balance: '/api/v1/wallet/balance',
    transactions: '/api/v1/wallet/transactions',
    methods: '/api/v1/wallet/methods',
    topup: '/api/v1/wallet/topup',
    withdraw: '/api/v1/wallet/withdraw',
  },
  tracking: {
    current: (orderId: string | number) => `/api/v1/orders/${orderId}/tracking/current`,
    route: (orderId: string | number) => `/api/v1/orders/${orderId}/tracking/route`,
  },
  vendors: {
    list: '/api/v1/vendors',
    detail: (id: string | number) => `/api/v1/vendors/${id}`,
  },
  promos: {
    global: '/api/v1/promos/global',
    vendor: (vendorId: string | number) => `/api/v1/promos/vendor/${vendorId}`,
    apply: '/api/v1/promos/apply', // Add the missing 'apply' endpoint
    remove: '/api/v1/promos/remove', // Add the missing 'remove' endpoint
  },
  reviews: {
    product: {
      list: (productId: string | number) => `/api/v1/reviews/product/${productId}/list`,
      summary: (productId: string | number) => `/api/v1/reviews/product/${productId}/summary`,
      create: (productId: string | number) => `/api/v1/reviews/product/${productId}/create`,
      update: (reviewId: string | number) => `/api/v1/reviews/${reviewId}/update`,
      remove: (reviewId: string | number) => `/api/v1/reviews/${reviewId}/remove`,
    },
    vendor: {
      list: (vendorId: string | number) => `/api/v1/reviews/vendor/${vendorId}/list`,
      summary: (vendorId: string | number) => `/api/v1/reviews/vendor/${vendorId}/summary`,
      create: (vendorId: string | number) => `/api/v1/reviews/vendor/${vendorId}/create`,
      update: (reviewId: string | number) => `/api/v1/reviews/${reviewId}/update`,
      remove: (reviewId: string | number) => `/api/v1/reviews/${reviewId}/remove`,
    },
  },
  geocode: {
    search: '/api/v1/geocode/search',
    reverse: '/api/v1/geocode/reverse',
  },
  search: {
    products: '/api/v1/search/products',
    suggest: '/api/v1/search/suggest',
  },
};

