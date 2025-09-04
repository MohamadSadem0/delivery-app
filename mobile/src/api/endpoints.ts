export const API_BASE = "" as const;

export const endpoints = {
  auth: { login: "/api/v1/auth/login", register: "/api/v1/auth/register", refresh: "/api/v1/auth/refresh", logout: "/api/v1/auth/logout", me: "/api/v1/auth/me" },
  profile: { me: "/api/v1/profile/me" },

  addresses: {
    list: "/api/v1/addresses",
    one: (id: string|number) => `/api/v1/addresses/${id}`,
    create: "/api/v1/addresses",
    update: (id: string|number) => `/api/v1/addresses/${id}`,
    remove: (id: string|number) => `/api/v1/addresses/${id}`,
    setDefault: (id: string|number) => `/api/v1/addresses/${id}/default`,
  },

  cart: { root: "/api/v1/cart", items: "/api/v1/cart/items", applyCoupon: "/api/v1/cart/apply-coupon" },

  catalog: {
    list: "/api/v1/catalog/products",
    one: (id: string|number) => `/api/v1/catalog/products/${id}`,
    products: "/api/v1/catalog/products",
    product: (id: string|number) => `/api/v1/catalog/products/${id}`,
    categories: "/api/v1/catalog/categories",
  },

  categories: { list: "/api/v1/categories", detail: (id: string|number) => `/api/v1/categories/${id}` },

  coupons: {
    preview: "/api/v1/coupons/preview",
    apply: "/api/v1/coupons/apply",
    remove: "/api/v1/coupons/remove",
    my: "/api/v1/coupons/my",
    validate: "/api/v1/coupons/validate",
    vendor: (vendorId: string|number) => `/api/v1/vendors/${vendorId}/coupons`,
  },

  orders: {
    list: "/api/v1/orders",
    detail: (id: string|number) => `/api/v1/orders/${id}`,
    one: (id: string|number) => `/api/v1/orders/${id}`,
    items: (id: string|number) => `/api/v1/orders/${id}/items`,
    refunds: (id: string|number) => `/api/v1/orders/${id}/refunds`,
    invoice: (id: string|number) => `/api/v1/orders/${id}/invoice`,
    create: "/api/v1/orders",
    track: (id: string|number) => `/api/v1/orders/${id}/track`,
    history: "/api/v1/orders/history",
    location: (id: string|number) => `/api/v1/orders/${id}/location`,
    path: (id: string|number) => `/api/v1/orders/${id}/path`,
  },

  refunds: {
    list: "/api/v1/refunds",
    detail: (id: string|number) => `/api/v1/refunds/${id}`,
    create: (orderId: string|number) => `/api/v1/orders/${orderId}/refunds`,
  },

  payments: {
    intent: "/api/v1/payments/intent",
    createIntent: "/api/v1/payments/intent",
    listCards: "/api/v1/payments/cards",
    setDefault: (id: string|number) => `/api/v1/payments/cards/${id}/default`,
    card: (id: string|number) => `/api/v1/payments/cards/${id}`,
    saveCard: "/api/v1/payments/cards",
    webhook: "/api/v1/payments/webhook",
    providerWebhook: (provider: string) => `/api/v1/payments/${provider}/webhook`,
  },

  promos: {
    global: "/api/v1/promos",
    vendor: (vendorId: string|number) => `/api/v1/vendors/${vendorId}/promos`,
    apply: "/api/v1/promos/apply",
    remove: "/api/v1/promos/remove",
  },
  promotions: { detail: (id: string|number) => `/api/v1/promotions/${id}` },

  reviews: {
    product: {
      list: (productId: string|number) => `/api/v1/products/${productId}/reviews`,
      summary: (productId: string|number) => `/api/v1/products/${productId}/reviews/summary`,
      create: (productId: string|number) => `/api/v1/products/${productId}/reviews`,
    },
    vendor: {
      list: (vendorId: string|number) => `/api/v1/vendors/${vendorId}/reviews`,
      summary: (vendorId: string|number) => `/api/v1/vendors/${vendorId}/reviews/summary`,
      create: (vendorId: string|number) => `/api/v1/vendors/${vendorId}/reviews`,
    },
    update: (reviewId: string|number) => `/api/v1/reviews/${reviewId}`,
    remove: (reviewId: string|number) => `/api/v1/reviews/${reviewId}`,
    flag: (reviewId: string|number) => `/api/v1/reviews/${reviewId}/flag`,
    helpful: (reviewId: string|number) => `/api/v1/reviews/${reviewId}/helpful`,
    create: (orderId: string|number) => `/api/v1/orders/${orderId}/reviews`,
  },

  favorites: {
    products: "/api/v1/favorites/products",
    vendors: "/api/v1/favorites/vendors",
    product: (id: string|number) => `/api/v1/favorites/products/${id}`,
    vendor: (id: string|number) => `/api/v1/favorites/vendors/${id}`,
  },

  chat: {
    threads: "/api/v1/chat/threads",
    thread: (id: string|number) => `/api/v1/chat/threads/${id}`,
    messages: (threadId: string|number) => `/api/v1/chat/threads/${threadId}/messages`,
    read: (threadId: string|number) => `/api/v1/chat/threads/${threadId}/read`,
  },

  notifications: {
    list: "/api/v1/notifications",
    inbox: "/api/v1/notifications",
    markRead: (id: string|number) => `/api/v1/notifications/${id}/read`,
    remove: (id: string|number) => `/api/v1/notifications/${id}`,
    registerToken: "/api/v1/notifications/register",
    test: "/api/v1/notifications/test",
  },

  cancellation: {
    reasons: (orderId: string|number) => `/api/v1/orders/${orderId}/cancellation/reasons`,
    create: (orderId: string|number) => `/api/v1/orders/${orderId}/cancellation`,
    detail: (orderId: string|number) => `/api/v1/orders/${orderId}/cancellation`,
  },

  search: { products: "/api/v1/search/products", suggest: "/api/v1/search/suggest" },
  tags: { list: "/api/v1/tags" },

  tracking: {
    current: (orderId: string|number) => `/api/v1/orders/${orderId}/tracking/current`,
    route: (orderId: string|number) => `/api/v1/orders/${orderId}/tracking/route`,
  },

  vendors: {
    list: "/api/v1/vendors",
    detail: (id: string|number) => `/api/v1/vendors/${id}`,
    products: "/api/v1/vendors/products",
    balance: "/api/v1/vendors/balance",
    ledger: "/api/v1/vendors/ledger",
  },
  // alias for code that uses "vendor"
  vendor: { products: "/api/v1/vendors/products", balance: "/api/v1/vendors/balance", ledger: "/api/v1/vendors/ledger" },

  wallet: {
    balance: "/api/v1/wallet/balance",
    transactions: "/api/v1/wallet/transactions",
    methods: "/api/v1/wallet/methods",
    removeMethod: (id: string|number) => `/api/v1/wallet/methods/${id}`,
    setDefault: (id: string|number) => `/api/v1/wallet/methods/${id}/default`,
    topup: "/api/v1/wallet/topup",
    withdraw: "/api/v1/wallet/withdraw",
  },

  geocode: { search: "/api/v1/geocode", reverse: "/api/v1/geocode/reverse", forward: "/api/v1/geocode" },
} as const;
