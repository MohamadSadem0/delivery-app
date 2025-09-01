import { useMemo } from 'react';

export function useStripeAvailable() {
  // If @stripe/stripe-react-native is installed, you can check initialization here.
  // We return false by default to avoid accidental runtime imports.
  return useMemo(() => false, []);
}
