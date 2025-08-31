import * as React from 'react';
import { View, Pressable, Switch } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  label: string;
  value?: string;
  onPress?: () => void;
  switchValue?: boolean;
  onToggle?: (v: boolean) => void;
};

export default function SettingRow({ label, value, onPress, switchValue, onToggle }: Props) {
  const { spacing, colors } = useTheme();
  const row = (
    <View style={{ paddingVertical: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text>{label}</Text>
      {onToggle != null ? (
        <Switch value={!!switchValue} onValueChange={onToggle} />
      ) : (
        value ? <Text muted>{value}</Text> : null
      )}
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{row}</Pressable> : row;
}
