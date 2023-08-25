import React, { useCallback, useContext, useRef, useState } from 'react';
import { TrainParamsList } from './train-tab';
import { Pressable, View } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { formatSessionDataForDb, StreamControls } from '../record/streamer'
import { trpc } from '../../utils/trpc';
import { DataEventPayload, startStream, stopStream } from '@acme/metawear-expo';
import Constants from 'expo-constants';
import { SessionChart } from '../../components/session-chart';
import DeviceContext from '../../device/device-context';
import { SessionList } from '../../components/sessions-list';


type TrainProps = BottomTabScreenProps<TrainParamsList, 'Train'>
export const TrainPage = ({ navigation, route: { params } }: TrainProps) => {
  const { moveId } = params
  const { streaming } = useContext(DeviceContext)

  const [previewData, setpreviewData] = useState<number[]>([])
  const allowPreviewRef = useRef(false)

  const gyroData = useRef<DataEventPayload[]>([])
  const accData = useRef<DataEventPayload[]>([])

  const utils = trpc.useContext();
  const { data: recordings, isFetching } = trpc.session.recent.useQuery({ moveId: params.moveId, limit: 20 })
  const { mutate } = trpc.move.createRecording.useMutation({
    onSuccess: async () => utils.session.invalidate()
  });

  const PreviewEvent = (n: number = 1) => {
    if (!allowPreviewRef.current) return;
    setpreviewData((v) => {
      if (v.length > parseInt(Constants?.expoConfig?.extra?.PREVIEW_DATA_LENGTH ?? "150", 10)) {
        v.shift();
      }
      return [...v, n]
    });
  }

  const startRecording = async () => {
    allowPreviewRef.current = true
    accData.current = []
    gyroData.current = []
  }

  const stopRecording = async () => {
    allowPreviewRef.current = false
    const recording = formatSessionDataForDb({
      accData: accData.current,
      gyroData: gyroData.current
    })
    mutate({
      ...recording,
      moveId,
    })
    setpreviewData(() => [])
    accData.current = []
    gyroData.current = []
  }

  return (
    <View className='bg-white h-full flex mb-10'>
      <View>
        <Pressable
          onPressIn={startRecording}
          onPressOut={stopRecording}
          pressRetentionOffset={1000}
        >
          <SessionChart
            data={[previewData]}
            epochStart={0} epochEnd={100}
          />
        </Pressable>
      </View>
      <View className='w-11/12 self-center'>
        <StreamControls
          hasData={streaming}
          onStart={() => startStream(
            (a) => {
              PreviewEvent(a.x)
              accData.current.push(a)
            },
            (g) => {
              gyroData.current.push(g)
            }
          )}
          onStop={() => {
            stopStream()
            accData.current = []
            gyroData.current = []
            setpreviewData([])
          }}
          onReset={() => { }}
          onSave={() => { }}
        />
      </View>
      <View style={{ flex: 1, alignSelf: 'stretch', margin: 5 }}>
        <SessionList
          recordings={recordings ? recordings.map((r, i) => ({
            ...r,
            name: `#${i}`,
          })) : undefined}
          isFetching={isFetching}
          navigate={(id) => {
            navigation.navigate('Session', { id });
          }}
        />
      </View>
    </View>
  );
}
