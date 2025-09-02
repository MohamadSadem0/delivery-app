import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import AddressTypePicker from './AddressTypePicker';
import { LEB_PHONE_REGEX, LEB_GOVERNORATES } from '@/constants/lebanon';

type Form = {
  label: string;
  type: 'home'|'work'|'other';
  line1: string; line2?: string; area?: string; city?: string; governorate?: string; phone?: string; instructions?: string;
};

export default function AddressForm({ initial, onSubmit, submitLabel = 'Save' }: { initial?: Partial<Form>; onSubmit: (v: Form) => void; submitLabel?: string }) {
  const { colors, spacing, radii } = useTheme();
  const [v, setV] = useState<Form>({ label: '', type: 'home', line1: '', ...initial });

  const input = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text } as const;

  const phoneValid = !v.phone || LEB_PHONE_REGEX.test(v.phone);

  return (
    <View style={{ gap: spacing.sm }}>
      <Text muted>Label</Text>
      <TextInput value={v.label} onChangeText={(t)=>setV({...v,label:t})} placeholder="Home, Work…" placeholderTextColor={colors.textMuted} style={input}/>
      <Text muted>Type</Text>
      <AddressTypePicker value={v.type} onChange={(t)=>setV({...v,type:t})}/>
      <Text muted>Address line 1</Text>
      <TextInput value={v.line1} onChangeText={(t)=>setV({...v,line1:t})} placeholder="Street, building" placeholderTextColor={colors.textMuted} style={input}/>
      <Text muted>Address line 2</Text>
      <TextInput value={v.line2||''} onChangeText={(t)=>setV({...v,line2:t})} placeholder="Apartment, floor…" placeholderTextColor={colors.textMuted} style={input}/>
      <Text muted>Area / Neighborhood</Text>
      <TextInput value={v.area||''} onChangeText={(t)=>setV({...v,area:t})} placeholder="e.g., Hamra" placeholderTextColor={colors.textMuted} style={input}/>
      <Text muted>City</Text>
      <TextInput value={v.city||''} onChangeText={(t)=>setV({...v,city:t})} placeholder="Beirut" placeholderTextColor={colors.textMuted} style={input}/>
      <Text muted>Governorate</Text>
      <TextInput value={v.governorate||''} onChangeText={(t)=>setV({...v,governorate:t})} placeholder={LEB_GOVERNORATES.join(', ')} placeholderTextColor={colors.textMuted} style={input}/>
      <Text muted>Phone (for driver)</Text>
      <TextInput value={v.phone||''} onChangeText={(t)=>setV({...v,phone:t})} keyboardType="phone-pad" placeholder="03 123 456" placeholderTextColor={colors.textMuted} style={[input, !phoneValid && {borderColor:'red'}]}/>
      <Text muted>Delivery instructions (optional)</Text>
      <TextInput value={v.instructions||''} onChangeText={(t)=>setV({...v,instructions:t})} placeholder="Gate code, landmarks…" placeholderTextColor={colors.textMuted} style={[input,{minHeight:88}]} multiline/>
      <Button title={submitLabel} onPress={()=>onSubmit(v)} disabled={!v.label.trim() || !v.line1.trim() || !phoneValid}/>
    </View>
  );
}
