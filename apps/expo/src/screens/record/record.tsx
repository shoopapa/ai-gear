import React from 'react';
import { RecordParamList } from './record-tab';
import { View } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Streamer } from './streamer'
import { SessionList } from '../../components/sessions-list';
import { trpc } from '../../utils/trpc';

type RecordProps = BottomTabScreenProps<RecordParamList, 'Record'>

export const Record = ({ navigation }: RecordProps) => {

  const { data: sessions } = trpc.session.recent.useQuery({ limit: 10 });

  return (
    <View className='bg-white'>
      <Streamer />
      <SessionList
        sessions={sessions}
        navigate={(id) => {
          navigation.navigate('Session', { id });
        }}
      ></SessionList>
    </View>
  );
}
