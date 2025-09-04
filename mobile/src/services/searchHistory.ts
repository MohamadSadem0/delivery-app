import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const K_RECENT = 'recent_searches';
const K_SAVED  = 'saved_searches';

export function useRecentSearches(limit = 10) {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => { (async () => {
    const v = await AsyncStorage.getItem(K_RECENT);
    setItems(v ? JSON.parse(v) : []);
  })(); }, []);

  const push = async (q: string) => {
    const curr = [q, ...items.filter(x => x !== q)].slice(0, limit);
    setItems(curr);
    await AsyncStorage.setItem(K_RECENT, JSON.stringify(curr));
  };
  const clear = async () => { setItems([]); await AsyncStorage.removeItem(K_RECENT); };
  return { items, push, clear };
}

export function useSavedSearches() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => { (async () => {
    const v = await AsyncStorage.getItem(K_SAVED);
    setItems(v ? JSON.parse(v) : []);
  })(); }, []);

  const toggle = async (key: string) => {
    const exists = items.includes(key);
    const next = exists ? items.filter(x => x !== key) : [key, ...items];
    setItems(next);
    await AsyncStorage.setItem(K_SAVED, JSON.stringify(next));
  };
  const isSaved = (key: string) => items.includes(key);
  return { items, toggle, isSaved };
}

