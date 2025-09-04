import * as Linking from 'expo-linking';

export function appLink(path: string) {
  const scheme = 'deliveryapp'; // matches app.json 'scheme'
  return `${scheme}://${path.replace(/^\//, '')}`;
}

export function orderTrackingLink(orderId: number) {
  return appLink(`/delivery/track/${orderId}`);
}

