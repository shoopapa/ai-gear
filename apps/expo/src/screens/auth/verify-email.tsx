import { useSignUp } from '@clerk/clerk-expo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { Text, TouchableOpacity } from 'react-native'

import { View, } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { AiGearTextInput } from '../../components/ai-gear-text-input';
import { AuthParamList } from './auth-tab';
import { SignInWithGoogleButton } from './signin-with-google-button';




type SignUpWithEmailProps = NativeStackScreenProps<
  AuthParamList,
  'VerifyEmail'
>;

export const VerifyEmail = ({ navigation }: SignUpWithEmailProps) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [code, setcode] = useState("");
  const [errorMessage, seterrorMessage] = useState('');

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      seterrorMessage(err.errors[0].longMessage)
    }
  };

  return (
    <View className="flex-col h-full flex-auto p-3">
      <Text className="text-2xl p-3">
        Verify Email
      </Text>
      <View>
        <AiGearTextInput
          label='Code'
          value={code}
          onChangeText={setcode}
        />
        <Text className='m-2 color-red'>{errorMessage}</Text>
        <Button
          textColor='white'
          className="m-3"
          disabled={code === ''}
          mode='contained'
          onPress={onPressVerify}
        >
          Verify
        </Button>
      </View>
    </View >
  );
}
