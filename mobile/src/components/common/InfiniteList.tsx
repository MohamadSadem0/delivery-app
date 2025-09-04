import React from 'react';
import { FlatList, View } from 'react-native';

type Props<T> = {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement | null;
  onEndReached?: () => void;
  loading?: boolean;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  gap?: number;
};

export default function InfiniteList<T>({ data, keyExtractor, renderItem, onEndReached, loading, ListHeaderComponent, ListEmptyComponent, gap = 12 }: Props<T>) {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      ItemSeparatorComponent={() => <View style={{ height: gap }} />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}


