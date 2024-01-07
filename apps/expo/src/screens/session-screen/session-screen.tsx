import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import { timeAgo } from '../../utils/time-ago';
import { SessionChart } from '../../components/session-chart';
import { useMyTheme } from '../../perfereneces';
import { RecordParamList } from '../record/record-tab';
import { trpc } from '../../utils/trpc';
import { EditableInfoCard, InfoCard } from '../../components/info-card';
import { MlTestComponenet } from './ml';


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

export const SessionPage = ({ route, navigation }: RecordProps) => {
  const theme = useMyTheme()
  const { id } = route.params;

  const sessionQuery = trpc.session.getById.useQuery({ id: id });

  const utils = trpc.useContext();
  const { mutate: deleteSession } = trpc.session.deleteById.useMutation({
    onMutate: () => {
      navigation.goBack()
    },
    onSuccess: () => {
      utils.session.invalidate()
    },
  });

  const { mutate: editName } = trpc.session.editName.useMutation({
    onSuccess: () => {
      utils.session.invalidate()
    }
  })

  if (!sessionQuery.data) {
    return (
      <View className='mt-1 flex-col h-full flex-auto items-center justify-center'>
        <ActivityIndicator size={30} animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View className='flex-1 text-black justify-start items-start' >
      <MlTestComponenet />
      <View className='h-56'>
        <SessionChart
          data={[
            sessionQuery.data?.accelerationX ?? [],
            sessionQuery.data?.accelerationY ?? [],
            sessionQuery.data?.accelerationZ ?? [],
          ]}
        />
      </View>
      <View className='w-11/12 self-center'>
        <Text className='my-3 color-black border-1 border-gray-300 text-l'>Session Metrics</Text>
        <EditableInfoCard
          onTextRightChange={(name) => {
            if (sessionQuery.data) {
              editName({ name, id: sessionQuery.data.id })
            }
          }}
          textLeft={`Session Name`}
          textRight={sessionQuery.data?.name}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Recorded`}
          textRight={sessionQuery.data.createdAt ? timeAgo.format(new Date(sessionQuery.data.createdAt)) : ''}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Session ID`}
          textRight={sessionQuery.data.id}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Peak X Acceration`}
          textRight={getHighestOfArray(sessionQuery.data.accelerationX ?? []) + 'g'}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Peak Y Acceration`}
          textRight={getHighestOfArray(sessionQuery.data.accelerationY ?? []) + 'g'}
        />
        <View className='p-2'></View>
        <InfoCard
          textLeft={`Peak Z Acceration`}
          textRight={getHighestOfArray(sessionQuery.data.accelerationZ ?? []) + 'g'}
        />
        <View className='p-2'></View>
        <Button
          style={{ backgroundColor: theme.colors.error }}
          mode="contained"
          textColor='white'
          icon='delete'
          onPress={() => deleteSession({ id })}
        >
          Delete
        </Button>
      </View>
    </View >
  );
}
