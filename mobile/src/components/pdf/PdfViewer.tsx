import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import Button from '@/components/ui/Button';

export default function PdfViewer({ uri }: { uri: string }) {
  const viewerUri = useMemo(() => {
    if (Platform.OS === 'android') {
      return `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(uri)}`;
    }
    return uri;
  }, [uri]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 44, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 8 }}>
        <Button title="Open externally" variant="outline" onPress={() => WebBrowser.openBrowserAsync(uri)} />
      </View>
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: viewerUri }} style={{ flex: 1 }} />
      </View>
    </View>
  );
}


