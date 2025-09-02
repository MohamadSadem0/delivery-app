import * as Linking from 'expo-linking';

export function buildLink(path: string) {
  const scheme = process.env.EXPO_PUBLIC_SCHEME || 'deliveryapp';
  return Linking.createURL(path, { scheme });
}
