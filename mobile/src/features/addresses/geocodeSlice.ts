import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { geocodeReverse, geocodeSearch } from '@/utils/geocode';

type State = {
  search: { query: string; results: any[]; status: 'idle'|'loading'|'error'; error?: string | null };
  reverse: { result: any | null; status: 'idle'|'loading'|'error'; error?: string | null };
};

const initialState: State = { search: { query: '', results: [], status: 'idle' }, reverse: { result: null, status: 'idle' } };

export const geocodeSearchThunk = createAsyncThunk('geocode/search', async (q: string, { rejectWithValue }) => {
  try { const r = await geocodeSearch(q); return { q, results: r.results || [] }; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const geocodeReverseThunk = createAsyncThunk('geocode/reverse', async ({ lat, lng }: { lat: number; lng: number }, { rejectWithValue }) => {
  try { const r = await geocodeReverse(lat, lng); return r.address || null; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'geocode',
  initialState,
  reducers: {},
  extraReducers: b => {
    b.addCase(geocodeSearchThunk.pending, (s, a) => { s.search.status = 'loading'; s.search.query = a.meta.arg as string; s.search.results = []; s.search.error = null; });
    b.addCase(geocodeSearchThunk.fulfilled, (s, a) => { s.search.status = 'idle'; s.search.results = (a.payload as any).results; });
    b.addCase(geocodeSearchThunk.rejected, (s, a) => { s.search.status = 'error'; s.search.error = String(a.payload || 'Failed'); });

    b.addCase(geocodeReverseThunk.pending, (s) => { s.reverse.status = 'loading'; s.reverse.error = null; });
    b.addCase(geocodeReverseThunk.fulfilled, (s, a) => { s.reverse.status = 'idle'; s.reverse.result = a.payload as any; });
    b.addCase(geocodeReverseThunk.rejected, (s, a) => { s.reverse.status = 'error'; s.reverse.error = String(a.payload || 'Failed'); });
  }
});

export default slice.reducer;
