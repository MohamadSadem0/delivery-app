import React from 'react';
import Screen from '@/components/layout/Screen';
import SearchBar from '@/components/search/SearchBar';
import RecentSearches from '@/components/search/RecentSearches';
import { useAppDispatch } from '@/store/hooks';
import { setQ } from '@/features/search/searchSlice';
import { router } from 'expo-router';

export default function SearchHome() {
  const dispatch = useAppDispatch();
  return (
    <Screen>
      <SearchBar autoFocus />
      <RecentSearches onSelect={(q) => { dispatch(setQ(q)); router.push('/search/results' as any); }} />
    </Screen>
  );
}


