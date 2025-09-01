import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
export default function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) { const { spacing } = useTheme(); return (<View style={{ alignItems: 'center', padding: spacing.xl }}><Text style={{ fontSize: 18 }} weight="semiBold">{title}</Text>{subtitle ? <Text muted style={{ marginTop: 											 spacing.xs, textAlign: 'center' }}>{subtitle}</Text> : null}</View>); }
