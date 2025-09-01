import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
export default function TextDateInput({ label, value, onChange }: { label: string; value?: string | null; onChange: (v: string | null) => void }) { const { spacing, colors, radii } = useTheme(); const [val, setVal] = useState(value || ''); const inputStyle = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text, width: 140 }; return (<View><Text muted>{label} (YYYY-MM-DD)</Text><TextInput value={val} placeholder="YYYY-MM-DD" placeholderTextColor={colors.textMuted} onChangeText={(t) => { setVal(t); onChange(t.trim() ? t.trim() : null); }} style={inputStyle} /></View>); }
