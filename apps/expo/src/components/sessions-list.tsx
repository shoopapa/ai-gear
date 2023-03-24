import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { List, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../utils/time-ago';
import { sessionRouter } from '@acme/api/src/router/session';

import type { inferRouterOutputs } from '@trpc/server/dist/core/types';
import { useMyTheme } from '../perfereneces';


type SessionListProps = {
  sessions?: inferRouterOutputs<typeof sessionRouter>['recent'];
  navigate: (id: string) => void;
  fetching: boolean
};

export const SessionList = ({ sessions, navigate, fetching }: SessionListProps) => {
  const theme = useMyTheme()

  if (!sessions || fetching) {
    return (
      <View style={{ height: '50%', marginTop: "4%", backgroundColor: 'white' }}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ height: '50%', marginTop: "4%", backgroundColor: 'white' }}>
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
