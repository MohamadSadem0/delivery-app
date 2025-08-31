import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import SettingRow from '@/components/account/SettingRow';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProfile } from '@/features/account/profileSlice';
import { selectMe } from '@/features/account/profile.selectors';
import { selectPrefs } from '@/features/preferences/preferences.selectors';
import { setTheme, setLanguage, setCurrency, setPushEnabled } from '@/features/preferences/preferencesSlice';
import { router } from 'expo-router';

export default function AccountHome() {
  const dispatch = useAppDispatch();
  const me = useAppSelector(selectMe);
  const prefs = useAppSelector(selectPrefs);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Account</Text>
      {me ? <Text muted style={{ marginBottom: 8 }}>{me.name} · {me.email}</Text> : <Text>Loading profile…</Text>}

      <Text weight="semiBold" style={{ marginTop: 12 }}>Preferences</Text>
      <SettingRow label="Theme" value={prefs.theme} onPress={() => dispatch(setTheme(prefs.theme === 'light' ? 'dark' : 'light'))} />
      <SettingRow label="Language" value={prefs.language.toUpperCase()} onPress={() => dispatch(setLanguage(prefs.language === 'en' ? 'ar' : 'en'))} />
      <SettingRow label="Currency" value={prefs.currency} onPress={() => dispatch(setCurrency(prefs.currency === 'LBP' ? 'USD' : 'LBP'))} />
      <SettingRow label="Push notifications" switchValue={prefs.pushEnabled} onToggle={(v) => dispatch(setPushEnabled(v))} />

      <Text weight="semiBold" style={{ marginTop: 12 }}>Addresses</Text>
      <SettingRow label="Manage addresses" onPress={() => router.push('/account/addresses')} value="Edit" />
    </Screen>
  );
}
