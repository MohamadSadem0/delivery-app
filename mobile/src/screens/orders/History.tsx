import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import OrderFilters from '@/components/orders/OrderFilters';
import OrderHistoryItem from '@/components/orders/OrderHistoryItem';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOrderFilters } from '@/features/orders/history.selectors';
import { setFilters } from '@/features/orders/orderFiltersSlice';
import { apiListOrderHistory } from '@/features/orders/orders.history.api';
import type { OrderRow, OrderHistoryFilters } from '@/features/orders/history.types';
import EmptyState from '@/components/common/EmptyState';
export default function OrderHistoryScreen() { const dispatch = useAppDispatch(); const saved = useAppSelector(selectOrderFilters); const [filters, setLocalFilters] = useState<OrderHistoryFilters>(saved); const [items, setItems] = useState<OrderRow[]>([]); const [page, setPage] = useState(1); const [loading, setLoading] = useState(false); useEffect(() => { void load(1, saved); }, []); const load = async (p: number, f = filters, append = false) => { setLoading(true); const res = await apiListOrderHistory({ page: p, pageSize: 20, ...f }); setLoading(false); if (append) setItems(prev => [...prev, ...res.data]); else setItems(res.data); setPage(p); }; const apply = async (f: OrderHistoryFilters) => { setLocalFilters(f); dispatch(setFilters(f)); await load(1, f); }; return (<Screen><Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Order history</Text><OrderFilters initial={saved} onApply={apply} /><FlatList data={items} keyExtractor={(o) => String(o.id)} renderItem={({ item }) => <OrderHistoryItem item={item} />} ListEmptyComponent={<EmptyState title="No orders found" subtitle="Try adjusting filters or date range." />} onEndReached={() => load(page + 1, filters, true)} onEndReachedThreshold={0.5} /><View style={{ height: 12 }} /><Button title={loading ? 'Loading…' : 'Refresh'} onPress={() => load(1, filters)} /></Screen>); }
