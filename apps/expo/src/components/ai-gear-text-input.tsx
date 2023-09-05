import { TextInput } from 'react-native-paper'

export type AiGearTextInputProps = {
  value: string
  onRightPress?: () => void
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  label: string
  error?: boolean
}

export const AiGearTextInput = ({ value, onChangeText, onRightPress, secureTextEntry, label, error }: AiGearTextInputProps) => {
  return (
    <TextInput
      error={error}
      className='m-2'
      outlineColor='black'
      textColor='black'
      label={label}
      secureTextEntry={secureTextEntry}
      autoCapitalize='none'
      mode='outlined'
      value={value}
      right={
        (onRightPress && <TextInput.Icon
          icon={secureTextEntry ? 'eye' : 'eye-off'}
          onPress={onRightPress}
        />)
      }
      onChangeText={onChangeText}
    />
  )
}
