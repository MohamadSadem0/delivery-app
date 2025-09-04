import React from 'react';
import { Modal, View, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { visible: boolean; onClose: () => void; children: React.ReactNode };

export default function ModalSheet({ visible, onClose, children }: Props) {
  const { colors, radii, spacing } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: '#0006' }} onPress={onClose} />
      <View style={{
        backgroundColor: colors.background,
        borderTopLeftRadius: radii.xl,
        borderTopRightRadius: radii.xl,
        padding: spacing.lg,
      }}>
        {children}
      </View>
    </Modal>
  );
}


