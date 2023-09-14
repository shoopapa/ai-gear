import React from 'react';
import { View } from 'react-native';

import { Button } from 'react-native-paper';
import { Text } from 'react-native';
import { Modal } from 'react-native-paper'
import { useMyTheme } from '../perfereneces';

type DownloadModalProps = {
  visible: boolean;
  cancel: () => void;
  confirm: () => void;
  confirmText?: string
  cancelText?: string
  message?: string
}

export const ConfirmationModal = ({ visible, cancel, confirm, cancelText, confirmText, message }: DownloadModalProps) => {
  const { colors } = useMyTheme()

  return (
    <Modal
      visible={visible}
      style={{ margin: 0 }}
      contentContainerStyle={{
        alignSelf: "center"
      }}
    >
      <View className='w-5/6 bg-white rounded-2xl p-5 self-center'>
        <Text className='text-center p-5 text-lg'>
          {message ?? 'Are you sure?'}
        </Text>
        <View className='w-full flex-row justify-between'>
          <Button
            className='w-1/2 text-white'
            mode="contained"
            style={{
              backgroundColor: colors.error,
            }}
            textColor='white'
            onPress={cancel}
          >
            {cancelText ?? 'Cancel'}
          </Button>
          <View className='p-1'></View>
          <Button
            className='w-1/2 text-white'
            mode="contained"
            style={{
              backgroundColor: colors.primary,
            }}
            textColor='white'
            onPress={confirm}
          >
            {confirmText ?? 'Confirm'}
          </Button>
        </View>
      </View>
    </Modal >
  )
}
