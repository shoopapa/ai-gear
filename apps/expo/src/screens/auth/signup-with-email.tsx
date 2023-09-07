import { useSignUp } from '@clerk/clerk-expo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback } from 'react-native'

import { View, } from "react-native";
import { Button } from 'react-native-paper';
import { AiGearTextInput } from '../../components/ai-gear-text-input';
import { AuthParamList } from './auth-tab';
import { isClerkError } from './clerk-error';




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
    <KeyboardAvoidingView
      className='h-full'
      style={{ flex: 1 }}
      behavior={'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col flex-auto justify-between p-5">
          <Text className="text-center text-4xl">
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
    </KeyboardAvoidingView>
  );
}
