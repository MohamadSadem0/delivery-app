import type { DeepLink } from './deepLinks.types';

// Add patterns you want to support
export const DEEP_LINKS: DeepLink[] = [
  { name: 'Product', pattern: /^\/product\/(\d+)$/i, to: (p) => `/products/${p[1]}` },
  { name: 'Vendor',  pattern: /^\/vendor\/(\d+)$/i,  to: (p) => `/vendors/${p[1]}` },
  { name: 'Order',   pattern: /^\/order\/(\d+)$/i,   to: (p) => `/orders/${p[1]}` },
  { name: 'Reviews for product', pattern: /^\/product\/(\d+)\/reviews$/i, to: (p) => `/products/${p[1]}/reviews` },
  { name: 'Cart',    pattern: /^\/cart$/i,             to: () => '/cart' },
];

