import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { OrderRow } from '@/features/orders/history.types';
import { router } from 'expo-router';
export default function OrderHistoryItem({ item }: { item: OrderRow }) { const { spacing, colors } = useTheme(); return (<Pressable onPress={() => router.push(`/orders/${item.id}`)}><View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}><Text weight="semiBold">{item.vendorName}</Text><Text muted>#{item.code || item.id} Â· {new Date(item.createdAt).toLocaleString()}</Text><Text style={{ marginTop: spacing.xs }}>{item.total.toFixed(0)} {item.currency} Â· {item.status.replace(/_/g,' ')}</Text></View></Pressable>); }


