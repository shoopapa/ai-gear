import { useSignUp } from '@clerk/clerk-expo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'

import { View, } from "react-native";
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AiGearTextInput } from '../../components/ai-gear-text-input';
import { AuthParamList } from './auth-tab';
import { isClerkError } from './clerk-error';
import { HeaderAdjustedKeyboardAvoidingView } from '../../components/header-adjusted-keyboard-avoiding-view';




type SignUpWithEmailProps = NativeStackScreenProps<
  AuthParamList,
  'SignUpWithEmail'
>;

export const SignUpWithEmail = ({ navigation }: SignUpWithEmailProps) => {
  const { isLoaded, signUp } = useSignUp();

  const [username, setusername] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorMessage, seterrorMessage] = useState('');

  useEffect(() => {
    setSecureTextEntry(true)
  }, [])

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        username,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      navigation.navigate('VerifyEmail', {})

    } catch (err: unknown) {
      if (isClerkError(err)) {
        seterrorMessage(err.errors[0]?.longMessage ?? '')
      }
    }
  };

  return (
    <HeaderAdjustedKeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col flex-auto justify-between p-3">
          <Text className="text-center text-4xl mt-3">
            AI Gear
          </Text>
          <View>
            <AiGearTextInput
              label='Username'
              value={username}
              onChangeText={setusername}
            />
            <AiGearTextInput
              label='Email'
              value={emailAddress}
              onChangeText={setemailAddress}
            />
            <AiGearTextInput
              label='Password'
              value={password}
              onRightPress={() => setSecureTextEntry(!secureTextEntry)}
              onChangeText={setpassword}
              secureTextEntry={secureTextEntry}
            />
            <Text className='m-2 color-red'>{errorMessage}</Text>
          </View>
          <Button
            textColor='white'
            className="m-3"
            disabled={username === '' || emailAddress === '' || password === ''}
            mode='contained'
            onPress={onSignUpPress}
          >
            Sign Up
          </Button>
        </View >
      </TouchableWithoutFeedback>
    </HeaderAdjustedKeyboardAvoidingView >
  );
}
