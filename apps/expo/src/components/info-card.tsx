import React from 'react'
import { View, Text } from 'react-native'
import { useMyTheme } from '../perfereneces'
import Ionicons from '@expo/vector-icons/Ionicons';

export const InfoCard = ({ textLeft, textRight, icon }: { textLeft: string, textRight?: string, icon?: string }) => {
  const { colors } = useMyTheme()
  return (
    <View
      className={` bg-gray-200 rounded-lg h-10 flex-row justify-between content-center w-full`}
    >
      <View className='self-center flex-row'>
        {icon && (
          <View className='self-center mx-2'>
            <Ionicons
              size={25}
              name={icon as any}
              color={colors.darkgray}
            />
          </View>
        )}
        <Text className='text-black px-2 self-center'>{textLeft}</Text>
      </View>
      <Text className='text-black px-5 self-center'>{textRight}</Text>
    </View>
  )
}
