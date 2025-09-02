import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useAppDispatch } from '@/store/hooks';
import { linkNavigated, linkReceived } from '@/features/deeplinks/deepLinksSlice';
import { navigateFromURL } from '@/features/deeplinks/deepLinks.handlers';

export function useDeepLinking() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => {
      dispatch(linkReceived(url));
      navigateFromURL(url);
      dispatch(linkNavigated(url));
    });
    (async () => {
      const init = await Linking.getInitialURL();
      if (init) { dispatch(linkReceived(init)); navigateFromURL(init); dispatch(linkNavigated(init)); }
    })();
    return () => sub.remove();
  }, [dispatch]);
}
