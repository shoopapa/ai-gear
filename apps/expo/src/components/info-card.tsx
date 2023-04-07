import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useMyTheme } from '../perfereneces'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';

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
type EditableInfoCardProps = { textLeft: string, textRight: string, icon?: string, onTextRightChange: (v: string) => void }
export const EditableInfoCard = ({ textLeft, textRight, icon, onTextRightChange }: EditableInfoCardProps) => {
  const { colors } = useMyTheme()
  const [name, setName] = useState(textRight)
  useEffect(() => {
    setName(textRight)
  }, [textRight])

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
      <View className='self-center bg-transparent'>
        <TextInput
          className='self-center bg-transparent'
          autoComplete='off'
          textColor='black'
          onChangeText={setName}
          onBlur={() => onTextRightChange(name)}
          value={name}
        >
        </TextInput>
      </View>
    </View >
  )
}
