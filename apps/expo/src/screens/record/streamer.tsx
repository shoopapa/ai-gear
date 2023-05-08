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
export const formatSessionDataForDb = ({ accData, gyroData }: formatSessionDataForDbInput) => {
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

export type StreamControlsProps = {
  hasData: boolean
  onReset: () => void
  onSave: () => void
  onStart: () => void
  onStop: () => void
}
export const StreamControls = ({ onReset, onSave, onStart, onStop, hasData }: StreamControlsProps) => {
  const { connected, streaming } = useContext(DeviceContext)
  const theme = useMyTheme()
  const { colors } = theme

  if (streaming) {
    return (
      <Button
        mode="contained"
        style={{ width: '100%', backgroundColor: colors.error }}
        disabled={!connected}
        textColor='white'
        onPress={onStop}
      >
        Stop
      </Button>
    )
  }

  if (hasData) {
    return (
      <View className='flex-row w-full justify-between'>
        <Button
          mode="contained"
          disabled={!connected}
          textColor='white'
          style={{
            backgroundColor: colors.primary,
            width: '48%',
          }}
          onPress={onReset}
        >
          Reset
        </Button>
        <Button
          mode="contained"
          disabled={!connected}
          textColor='white'
          style={{
            backgroundColor: colors.success,
            width: '48%',
          }}
          onPress={onSave}
        >
          Save
        </Button>
      </View>
    )
  }

  return (
    <Button
      className=''
      mode="contained"
      disabled={!connected || streaming}
      textColor='white'
      style={{
        backgroundColor: colors.primary,
        width: '100%',
      }}
      onPress={onStart}
    >
      start
    </Button>
  )
}
