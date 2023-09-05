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
  'SignUpWithEmail'
>;

export const SignUpWithEmail = ({ navigation }: SignUpWithEmailProps) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [username, setusername] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
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

    } catch (err: any) {
      seterrorMessage(err.errors[0].longMessage)
    }
  };

  return (
    <View className="flex-col h-full flex-auto p-3">
      <Text className="text-2xl p-3">
        Account Details
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
        <Button
          textColor='white'
          className="m-3"
          disabled={username === '' || emailAddress === '' || password === ''}
          mode='contained'
          onPress={onSignUpPress}
        >
          Sign Up
        </Button>
      </View>
    </View >
  );
}
