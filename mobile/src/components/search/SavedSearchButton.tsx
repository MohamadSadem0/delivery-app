import React from 'react';
import Button from '@/components/ui/Button';
import { useSavedSearches } from '@/services/searchHistory';

export default function SavedSearchButton({ queryKey }: { queryKey: string }) {
  const { isSaved, toggle } = useSavedSearches();
  const saved = isSaved(queryKey);
  return <Button title={saved ? 'Saved âœ“' : 'Save search'} variant={saved ? 'outline' : 'solid'} onPress={() => toggle(queryKey)} />;
}


