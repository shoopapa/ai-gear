import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { List, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../utils/time-ago';

import { useMyTheme } from '../perfereneces';
import { trpc } from '../utils/trpc';


type SessionListProps = {
  navigate: (id: string) => void;
};

export const SessionList = ({ navigate }: SessionListProps) => {
  const theme = useMyTheme()

  const { data: sessions, isFetching } = trpc.session.recent.useQuery({ limit: 10 });

  if (!sessions || isFetching) {
    return (
      <View className='mt-1 h-full'>
        <Text className='m-3'>10 Most Recent Sessions</Text>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View className='mt-1 h-full'>
      <Text className='m-3'>10 Most Recent Sessions</Text>
      <View className='h-max'>
        <ScrollView className=' text-black'>
          {sessions.map((s) => {
            let t = 'No Create at'
            if (s.createdAt) {
              t = timeAgo.format(new Date(s.createdAt));
            }
            return (
              <List.Item
                className='mx-2 my-0 py-1 px-1'
                theme={theme}
                titleStyle={{ color: 'black' }}
                descriptionStyle={{ color: 'black' }}
                onPress={() => navigate(s.id)}
                key={s.id}
                title={s.name}
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
