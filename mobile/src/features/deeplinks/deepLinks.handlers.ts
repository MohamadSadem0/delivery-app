import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { DEEP_LINKS } from './deepLinks.config';
import { LINK_PREFIXES } from '@/constants/deeplinks';

export function parseURL(url: string): string | null {
  const path = Linking.parse(url).path || '';
  for (const d of DEEP_LINKS) {
    const m = path.match(d.pattern);
    if (m) return d.to(m as any);
  }
  return null;
}

export function navigateFromURL(url: string) {
  const to = parseURL(url);
  if (to) router.push(to as any);
}

export function createURL(path: string) {
  return Linking.createURL(path, { scheme: LINK_PREFIXES[0].replace('://','') });
}
