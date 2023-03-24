import { DataEventPayload, startStream, stopStream } from '@acme/metawear-expo';
import Constants from 'expo-constants';
import { useContext, useRef, useState } from 'react';
import { Pressable, View } from 'react-native'
import { Button } from 'react-native-paper';
import { SessionChart } from '../../components/session-chart';
import DeviceContext from '../../device/device-context';
import { useMyTheme } from '../../perfereneces';
import { trpc } from '../../utils/trpc';

type formatSessionDataForDbInput = {
  gyroData: DataEventPayload[]
  accData: DataEventPayload[]
}
const formatSessionDataForDb = ({ accData, gyroData }: formatSessionDataForDbInput) => {
  const accelerationT: number[] = []
  const accelerationX: number[] = []
  const accelerationY: number[] = []
  const accelerationZ: number[] = []
  accData.map(a => {
    accelerationT.push(a.t)
    accelerationX.push(a.x)
    accelerationY.push(a.y)
    accelerationZ.push(a.z)
  })
  const gyroT: number[] = []
  const gyroX: number[] = []
  const gyroY: number[] = []
  const gyroZ: number[] = []
  gyroData.map(g => {
    gyroT.push(g.t)
    gyroX.push(g.x)
    gyroY.push(g.y)
    gyroZ.push(g.z)
  })
  return {
    accelerationT,
    accelerationX,
    accelerationY,
    accelerationZ,
    gyroT,
    gyroX,
    gyroY,
    gyroZ,
  }
}

export const Streamer = () => {
  const theme = useMyTheme()
  const { colors } = theme
  const gyroData = useRef<DataEventPayload[]>([])
  const accData = useRef<DataEventPayload[]>([])
  const { connected, streaming } = useContext(DeviceContext)
  const [previewData, setpreviewData] = useState<number[]>([])

  const PreviewEvent = (n: number = 1) => {
    setpreviewData((v) => {
      if (v.length > parseInt(Constants?.expoConfig?.extra?.PREVIEW_DATA_LENGTH ?? "150", 10)) {
        v.shift();
      }
      return [...v, n]
    });
  }

  const utils = trpc.useContext();
  const { mutate } = trpc.session.create.useMutation({
    async onSuccess() {
      await utils.session.invalidate()
    },
  });


  const buttons = () => {
    if (streaming) {
      return (
        <Button
          className='mt-6'
          mode="contained"
          style={{ width: '100%', backgroundColor: colors.error }}
          disabled={!connected}
          textColor='white'
          onPress={() => {
            stopStream()
          }}
        >
          Stop
        </Button>
      )
    }

    if (previewData.length > 0) {
      return (
        <>
          <Button
            mode="contained"
            disabled={!connected}
            textColor='white'
            style={{
              marginBottom: 10,
              backgroundColor: colors.primary,
              width: '100%',
            }}
            onPress={() => {
              accData.current = []
              gyroData.current = []
              setpreviewData([])
            }}
          >
            Reset
          </Button>
          <Button
            mode="contained"
            disabled={!connected}
            textColor='white'
            style={{
              backgroundColor: colors.success,
              width: '100%',
            }}
            onPress={async () => {
              mutate(formatSessionDataForDb({
                accData: accData.current,
                gyroData: gyroData.current
              }))
              setpreviewData([])
              accData.current = []
              gyroData.current = []
            }}
          >
            Save
          </Button>
        </>
      )
    }

    return (
      <Button
        className='mt-6'
        mode="contained"
        disabled={!connected}
        textColor='white'
        style={{
          backgroundColor: colors.primary,
          width: '100%',
        }}
        onPress={() => {
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
      >
        start
      </Button>
    )
  }

  return (
    <View style={{ height: '45%' }}>
      <Pressable
        pressRetentionOffset={1000}
      >
        <SessionChart
          data={[previewData]}
          epochStart={0} epochEnd={100}
        />
      </Pressable>
      <View className='w-full'>
        <View className='w-11/12 self-center'>
          {buttons()}
        </View>
      </View>
    </View >
  )
}
