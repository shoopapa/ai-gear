import React, { useRef, useState, } from 'react';
import { RecordParamList } from './record-tab';
import { Pressable, View, Text } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { formatSessionDataForDb, StreamControls } from './streamer'
import { SessionList } from '../../components/sessions-list';
import { trpc } from '../../utils/trpc';
import { DataEventPayload, startStream, stopStream } from '@acme/metawear-expo';
import Constants from 'expo-constants';
import { SessionChart } from '../../components/session-chart';

type RecordProps = BottomTabScreenProps<RecordParamList, 'Record'>


export const Record = ({ navigation }: RecordProps) => {

  const gyroData = useRef<DataEventPayload[]>([])
  const accData = useRef<DataEventPayload[]>([])
  const [previewData, setpreviewData] = useState<number[]>([])
  const utils = trpc.useContext();

  const { data: recordings, isFetching } = trpc.session.recent.useQuery({ limit: 10 });

  const v = useRef(0)
  const PreviewEvent = (n = 1) => {
    v.current += 1
    if (v.current === 3) {
      v.current = 0
      setpreviewData((v) => {
        if (v.length > parseInt(Constants?.expoConfig?.extra?.PREVIEW_DATA_LENGTH ?? "150", 10)) {
          v.shift();
        }
        return [...v, n]
      });
    }
  }

  const { mutate } = trpc.session.create.useMutation({
    onSuccess: async () => utils.session.invalidate()
  });

  const reset = () => {
    accData.current = []
    gyroData.current = []
    setpreviewData([])
  }

  return (
    <View className='bg-white h-full'>
      <Pressable
        pressRetentionOffset={1000}
      >
        <SessionChart
          data={[previewData]}
          epochStart={0} epochEnd={100}
        />
      </Pressable>
      <View className='w-11/12 self-center'>
        <StreamControls
          hasData={previewData.length > 0}
          onStart={() => {
            startStream(
              (a) => {
                PreviewEvent(a.x)
                accData.current.push(a)
              },
              (g) => {
                gyroData.current.push(g)
              }
            )
          }}
          onStop={() => {
            stopStream()
          }}
          onReset={() => {
            reset()
          }}
          onSave={async () => {
            mutate(formatSessionDataForDb({
              accData: accData.current,
              gyroData: gyroData.current
            }))
            reset()
          }}
        />
      </View>
      <Text className='m-1 ml-3'>Recent Sessions</Text>
      <View style={{ flex: 1, alignSelf: 'stretch', margin: 5 }}>
        <SessionList
          recordings={recordings}
          isFetching={isFetching}
          navigate={(id) => {
            navigation.navigate('Session', { id });
          }}
        />
      </View>
    </View>
  );
}
