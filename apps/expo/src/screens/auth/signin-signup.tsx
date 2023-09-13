import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { coolDownAsync, warmUpAsync } from 'expo-web-browser';
import React, { } from "react";
import { Text } from 'react-native'

import { View, } from "react-native";
import { Button } from 'react-native-paper';
import { AuthParamList } from './auth-tab';
import { SignInWithAppleButton } from './signin-with-apple-button';
import { SignInWithGoogleButton } from './signin-with-google-button';


type SignInSignUpProps = NativeStackScreenProps<
  AuthParamList,
  'SignInSignUp'
>;

export const SignInSignUp = ({ navigation }: SignInSignUpProps) => {

  React.useEffect(() => {
    warmUpAsync()
    return () => { coolDownAsync() }
  }, []);

  return (
    <View className="flex-col h-full flex-auto justify-between py-10  pt-40 ">
      <Text className="text-center text-4xl">
        AI Gear
      </Text>
      <View className="p-4">
        <SignInWithAppleButton />
        <SignInWithGoogleButton />
        <Button
          textColor='white'
          className="m-3"
          mode='contained'
          onPress={() => { navigation.navigate('SignInWithEmail', {}) }}
        >Sign in With Email</Button>
        <Button
          textColor='black'
          className="m-3"
          mode='outlined'
          onPress={() => { navigation.navigate('SignUpWithEmail', {}) }}
        >Sign Up with Email</Button>
      </View>
    </View>
  );
};
