import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import { List, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../utils/time-ago';

import { useMyTheme } from '../perfereneces';
import { MyText } from './ai-gear-text';


type SessionListProps = {
  navigate: (id: string) => void;
  recordings?: {
    id: string;
    createdAt: Date;
    name: string;
  }[]
  isFetching: boolean
};

export const SessionList = ({ navigate, recordings, isFetching }: SessionListProps) => {
  const theme = useMyTheme()

  if (isFetching) {
    <View className='mt-1 flex-col flex-auto items-center justify-center'>
      <ActivityIndicator animating={true} color={theme.colors.primary} />
    </View>
  }

  if (recordings === undefined || recordings.length === 0) {
    return (
      <View className='mt-1 flex-col flex-auto items-center justify-center'>
        <Text className='font-Roboto_500Medium text-lg p-1 font-medium'>No Recent Sessions</Text>
        <Text className='text-lg'>Connect your device to get started!</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <ScrollView className='text-black'>
          {recordings.map((s) => {
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
