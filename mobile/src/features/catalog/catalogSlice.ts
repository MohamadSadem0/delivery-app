import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CatalogState, ProductQuery } from './catalog.types';
import type { Product } from '@/types/models/Product';
import type { Category } from '@/types/models/Category';
import { apiListProducts, apiGetProduct, apiListCategories } from './catalog.api';

const initialState: CatalogState = {
  status: 'idle',
  items: [],
  byId: {},
  categories: [],
  page: 1,
  pageSize: 20,
  total: 0,
};

export const fetchProducts = createAsyncThunk('catalog/fetchProducts', async (params: ProductQuery | undefined, { rejectWithValue }) => {
  try {
    const res = await apiListProducts(params);
    return res;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchProductById = createAsyncThunk('catalog/fetchProductById', async (id: number, { rejectWithValue }) => {
  try {
    const product = await apiGetProduct(id);
    return product;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchCategories = createAsyncThunk('catalog/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const data = await apiListCategories();
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.data as Product[];
        state.page = action.payload.meta?.page ?? 1;
        state.pageSize = action.payload.meta?.pageSize ?? 20;
        state.total = action.payload.meta?.total ?? state.items.length;
        state.byId = { ...state.byId };
        for (const p of state.items) {
          state.byId[p.id] = p;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = String(action.payload || 'Failed to load products');
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const p = action.payload as Product;
        state.byId[p.id] = p;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload as Category[];
      });
  },
});

export default slice.reducer;
