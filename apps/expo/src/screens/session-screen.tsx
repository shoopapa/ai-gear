import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Button, List, Text } from 'react-native-paper';
import { View } from 'react-native';
import { timeAgo } from '../utils/time-ago';
import { SessionChart } from '../components/session-chart';
import { styles, useMyTheme } from '../perfereneces';
import { RecordParamList } from './record/record-tab';
import { trpc } from '../utils/trpc';
import { InfoCard } from '../components/info-card';


const getHighestOfArray = (arr: number[]): number => {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  if (Math.abs(max) > Math.abs(min)) {
    return Math.round(max * 100) / 100;
  }
  return Math.round(min * 100) / 100;
};

type RecordProps = NativeStackScreenProps<
  RecordParamList,
  'Session'
>;

export const SessionPage = ({ route }: RecordProps) => {
  const theme = useMyTheme()
  const { id } = route.params;

  const sessionQuery = trpc.session.getById.useQuery({ id: id });

  if (sessionQuery.isFetching === null) {
    return (
      <View style={styles(theme).container}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View className='' style={{ ...styles(theme).container, alignItems: 'flex-start' }}>
      <View className='h-56'>
        <SessionChart
          data={[
            sessionQuery.data?.accelerationX ?? [],
            sessionQuery.data?.accelerationY ?? [],
            sessionQuery.data?.accelerationZ ?? [],
            // sectionData,
          ]}
        />
      </View>
      <View className='w-11/12 self-center'>
        <Text className='my-3 color-black border-1 border-gray-300 text-l'>Session Metrics</Text>
        <InfoCard
          textLeft={`Session Name`}
          textRight={sessionQuery.data?.name}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Recorded`}
          textRight={sessionQuery.data?.createdAt ? timeAgo.format(new Date(sessionQuery.data.createdAt)) : ''}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Session ID`}
          textRight={sessionQuery.data?.id}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Peak X Acceration`}
          textRight={getHighestOfArray(sessionQuery.data?.accelerationX ?? []) + 'g'}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Peak Y Acceration`}
          textRight={getHighestOfArray(sessionQuery.data?.accelerationY ?? []) + 'g'}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Peak Z Acceration:`}
          textRight={getHighestOfArray(sessionQuery.data?.accelerationZ ?? []) + 'g'}
        />
        <View className='p-2'></View>
        <Button
          style={{ backgroundColor: theme.colors.error }}
          mode="contained"
          textColor='white'
          icon='delete'
          onPress={async () => {
            //delete
          }}
        >
          Delete
        </Button>
      </View>
    </View >
  );
}
