import React from 'react';
import Button from '@/components/ui/Button';
import * as WebBrowser from 'expo-web-browser';

export default function PdfOpenButton({ url, title = 'Open invoice PDF' }: { url: string; title?: string }) {
  return <Button title={title} onPress={() => WebBrowser.openBrowserAsync(url)} />;
}


