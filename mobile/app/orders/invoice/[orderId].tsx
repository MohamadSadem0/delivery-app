import React, { useEffect, useState } from 'react';
import PdfViewer from '@/components/pdf/PdfViewer';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useLocalSearchParams } from 'expo-router';
import { apiGetInvoicePdfUrl } from '@/features/orders/invoice.api';

export default function InvoiceViewer() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await apiGetInvoicePdfUrl(orderId!);
        setUrl(r.url);
      } catch (e: any) {
        setError(e?.message || 'Failed to load invoice');
      }
    })();
  }, [orderId]);

  if (error) return <Screen><Text>{error}</Text></Screen>;
  if (!url) return <Screen><Text>Loading…</Text></Screen>;

  return <PdfViewer uri={url} />;
}
