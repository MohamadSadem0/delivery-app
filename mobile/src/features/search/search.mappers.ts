import type { SearchResponse, ProductHit, Facet, FacetValue } from '@/types/models/Search';

export function mapHit(api: any): ProductHit {
  return {
    id: api.id,
    sku: api.sku,
    name: api.name,
    price: Number(api.price),
    currency: api.currency || 'LBP',
    image: api.image || null,
    rating: api.rating || 0,
    vendor: api.vendor ? { id: api.vendor.id, name: api.vendor.name } : undefined,
    badge: api.badge || null,
    inStock: api.in_stock ?? api.inStock ?? true,
  };
}

export function mapFacet(api: any): Facet {
  return {
    name: api.name,
    code: api.code,
    values: (api.values || []).map((v: any): FacetValue => ({ key: String(v.key), label: v.label, count: Number(v.count), selected: !!v.selected }))
  };
}

export function mapSearchResponse(api: any): SearchResponse {
  return {
    data: (api.data || []).map(mapHit),
    total: Number(api.total || 0),
    facets: (api.facets || []).map(mapFacet),
    page: Number(api.page || 1),
    pageSize: Number(api.page_size || api.pageSize || 20),
    tookMs: api.took_ms ?? api.tookMs,
  };
}

