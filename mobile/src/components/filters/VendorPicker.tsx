import React, { useEffect, useMemo, useState } from 'react';
import { View, Pressable, Modal, FlatList } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVendors } from '@/features/vendors/vendorsSlice';
import { selectVendors } from '@/features/vendors/vendors.selectors';
export default function VendorPicker({ value, onChange }: { value: number | null | undefined; onChange: (v: number | null) => void }) { const { spacing, colors, radii } = useTheme(); const [open, setOpen] = useState(false); const dispatch = useAppDispatch(); const vendors = useAppSelector(selectVendors); useEffect(() => { if (!vendors.length) dispatch(fetchVendors({ page: 1, pageSize: 100 } as any)); }, [vendors.length, dispatch]); const selected = useMemo(() => vendors.find(v => v.id === value) || null, [vendors, value]); return (<View><Pressable onPress={() => setOpen(true)} style={{ padding: spacing.md, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border }}><Text>{selected ? selected.name : 'All vendors'}</Text></Pressable><Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}><Pressable style={{ flex: 1, backgroundColor: '#0006' }} onPress={() => setOpen(false)} /><View style={{ position: 'absolute', left: 16, right: 16, top: 100, backgroundColor: '#fff', borderRadius: radii.lg, padding: spacing.md, maxHeight: 420 }}><Text weight="semiBold" style={{ marginBottom: spacing.sm }}>Select vendor</Text><FlatList data={[{ id: 0, name: 'All vendors' }, ...vendors] as any} keyExtractor={(v:any) => String(v.id)} renderItem={({ item }: any) => (<Pressable onPress={() => { onChange(item.id ? item.id : null); setOpen(false); }} style={{ paddingVertical: spacing.sm }}><Text>{item.name}</Text></Pressable>)} /></View></Modal></View>); }


