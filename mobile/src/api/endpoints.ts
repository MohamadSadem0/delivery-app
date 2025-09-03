// Derived from OpenAPI servers
export const API_BASE = "http://127.0.0.1:8000";

export const endpoints = {
 auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    refresh: '/api/v1/auth/refresh',
    logout: '/api/v1/auth/logout',
    me: '/api/v1/auth/me',
  },
  catalog: {
    list: '/api/v1/catalog/products',
    one: (id: string | number) => `/api/v1/catalog/products/${id}`,
  },
  vendor: {
    products: '/api/v1/vendor/products',
    product: (id: string | number) => `/api/v1/vendor/products/${id}`,
    balance: '/api/v1/vendor/balance',
    ledger: '/api/v1/vendor/ledger',
    payouts: '/api/v1/vendor/payouts',
    payout: (id: string | number) => `/api/v1/vendor/payouts/${id}`,
    payoutStatement: (id: string | number) => `/api/v1/vendor/payouts/${id}/statement`,
  },
  cart: {
    root: '/api/v1/cart',
    items: '/api/v1/cart/items',
  },
  orders: {
    list: '/api/v1/orders',
    one: (id: string | number) => `/api/v1/orders/${id}`,
    refunds: (id: string | number) => `/api/v1/orders/${id}/refunds`,
  },
  addresses: {
    list: '/api/addresses',
    one: (id: string | number) => `/api/addresses/${id}`,
  },
  payments: {
    intent: '/api/v1/payments/intent',
    webhook: '/api/v1/payments/webhook',
    providerWebhook: (provider: string) => `/api/v1/webhooks/payments/${provider}`
  },
  coupons: {
    preview: '/api/v1/coupons/preview'
  }
} as const;
