import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import AddCardButton from '@/components/payments/AddCardButton';
import CardListItem from '@/components/payments/CardListItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCards, deleteCardThunk, setDefaultCardThunk } from '@/features/payments/paymentsSlice';
import { selectSavedCards } from '@/features/payments/payments.selectors';
import { FlatList } from 'react-native';

export default function PaymentsHome() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectSavedCards);

  useEffect(() => { dispatch(fetchCards()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Payment methods</Text>
      <AddCardButton />
      <FlatList
        data={cards}
        keyExtractor={c => c.id}
        renderItem={({ item }) => (
          <CardListItem
            card={item}
            onDelete={() => dispatch(deleteCardThunk(item.id))}
            onMakeDefault={() => dispatch(setDefaultCardThunk(item.id))}
          />
        )}
      />
    </Screen>
  );
}

