import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { List, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../utils/time-ago';

import { useMyTheme } from '../perfereneces';
import { trpc } from '../utils/trpc';


type MoveListProps = {
  navigate: (id: string) => void;
};

export const MoveList = ({ navigate }: MoveListProps) => {
  const theme = useMyTheme()

  const { data: moves, isFetching } = trpc.move.list.useQuery({ limit: 10 })

  if (isFetching || !moves || moves.length === 0) {
    return (
      <View className='mt-1 flex-col h-full flex-auto items-center justify-center'>
        <ActivityIndicator size={30} animating={true} color={theme.colors.primary} />
      </View>
    )
  }


  return (
    <View className='mt-1 h-full'>
      <Text className='m-3'>Your Moves</Text>
      <View className='h-max'>
        <ScrollView className=' text-black'>
          {moves.map((m) => {
            let t = 'No Create at'
            if (m.createdAt) {
              t = timeAgo.format(new Date(m.createdAt));
            }
            return (
              <List.Item
                className='mx-2 my-0 py-1 px-1'
                theme={theme}
                titleStyle={{ color: 'black' }}
                descriptionStyle={{ color: 'black' }}
                onPress={() => navigate(m.id)}
                key={m.id}
                title={m.name}
                description={t}
                left={() => (
                  <List.Icon style={{ padding: 0, margin: 0 }} color='black' icon="run" />
                )}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
