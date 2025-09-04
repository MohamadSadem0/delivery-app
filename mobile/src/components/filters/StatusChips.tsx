import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { OrderStatus } from '@/features/orders/history.types';
const ALL: (OrderStatus | null)[] = [null, 'pending','confirmed','preparing','on_the_way','delivered','cancelled'];
export default function StatusChips({ value, onChange }: { value: OrderStatus | null | undefined; onChange: (v: OrderStatus | null) => void }) { const { spacing, colors, radii } = useTheme(); const label = (s: OrderStatus | null) => s ? s.replace(/_/g,' ') : 'All'; return (<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>{ALL.map(s => { const selected = value === s || (!value && s === null); return (<Pressable key={String(s)} onPress={() => onChange(s)} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radii.pill, borderWidth: 1, borderColor: selected ? colors.primary : colors.border }}><Text style={{ color: selected ? colors.primary : colors.text }}>{label(s)}</Text></Pressable>); })}</View>); }


