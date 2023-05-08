import React, { useContext, useRef, useState } from 'react';
import { TrainParamsList } from './train-tab';
import { Pressable, View } from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { formatSessionDataForDb, StreamControls } from '../record/streamer'
import { trpc } from '../../utils/trpc';
import { DataEventPayload, startStream, stopStream } from '@acme/metawear-expo';
import Constants from 'expo-constants';
import { SessionChart } from '../../components/session-chart';
import DeviceContext from '../../device/device-context';


type TrainProps = BottomTabScreenProps<TrainParamsList, 'Train'>
export const TrainPage = ({ navigation, route: { params } }: TrainProps) => {
  const { moveId } = params
  const { streaming } = useContext(DeviceContext)

  const [previewData, setpreviewData] = useState<number[]>([])

  const gyroData = useRef<DataEventPayload[]>([])
  const accData = useRef<DataEventPayload[]>([])

  const utils = trpc.useContext();

  const PreviewEvent = (n: number = 1) => {
    setpreviewData((v) => {
      if (v.length > parseInt(Constants?.expoConfig?.extra?.PREVIEW_DATA_LENGTH ?? "150", 10)) {
        v.shift();
      }
      return [...v, n]
    });
  }

  const { mutate } = trpc.move.createRecording.useMutation({
    onSuccess: async () => utils.move.invalidate()
  });

  const startRecording = async () => {
    accData.current = []
    gyroData.current = []
    setpreviewData([])
  }

  const stopRecording = async () => {
    const recording = formatSessionDataForDb({
      accData: accData.current,
      gyroData: gyroData.current
    })
    mutate({
      ...recording,
      moveId,
      quality: .5
    })
  }

  return (
    <View className='bg-white h-full'>
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
      <View className='w-11/12 self-center'>
        <StreamControls
          hasData={streaming}
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
            accData.current = []
            gyroData.current = []
            setpreviewData([])
          }}
          onReset={() => { }}
          onSave={() => { }}
        />
      </View>
    </View>
  );
}
