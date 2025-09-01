export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  catalog: {
    products: '/products',
    product: (id: string | number) => `/products/${id}`,
    categories: '/categories',
  },
  vendors: {
    list: '/vendors',
    detail: (id: string | number) => `/vendors/${id}`,
    products: (id: string | number) => `/vendors/${id}/products`,
  },
  cart: {
    applyCoupon: '/cart/coupon',
  },
  orders: {
    create: '/orders',
    list: '/orders',
    detail: (id: string | number) => `/orders/${id}`,
    track: (id: string | number) => `/orders/${id}/track`,
  },
  addresses: {
    list: '/addresses',
    create: '/addresses',
    update: (id: string | number) => `/addresses/${id}`,
    delete: (id: string | number) => `/addresses/${id}`,
  },
  notifications: {
    registerToken: '/notifications/register',
    list: '/notifications',
    markRead: (id: string | number) => `/notifications/${id}/read`,
  },
  payments: {
    init: '/payments/init',
    confirm: '/payments/confirm',
  },
} as const;
