import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { value: number; onChange: (v: number) => void; min?: number; max?: number };

export default function Quantity({ value, onChange, min = 1, max = 99 }: Props) {
  const { colors, spacing, radii } = useTheme();
  const Btn = ({ sign, delta }: { sign: string; delta: number }) => (
    <Pressable
      onPress={() => onChange(Math.min(max, Math.max(min, value + delta)))}
      style={{
        width: 32,
        height: 32,
        borderRadius: radii.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text>{sign}</Text>
    </Pressable>
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
      <Btn sign="-" delta={-1} />
      <Text>{value}</Text>
      <Btn sign="+" delta={+1} />
    </View>
  );
}


