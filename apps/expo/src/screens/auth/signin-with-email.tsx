import { useSignIn } from '@clerk/clerk-expo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback } from 'react-native'

import { View, } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { AuthParamList } from './auth-tab';


type SignInWithEmailProps = NativeStackScreenProps<
  AuthParamList,
  'SignInWithEmail'
>;

export const SignInWithEmail = ({ navigation }: SignInWithEmailProps) => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [error, seterror] = useState(false)

  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      navigation.goBack()
    } catch (err: unknown) {
      seterror(true)
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col flex-auto justify-between p-5 py-20">
          <Text className="text-center text-4xl">
            AI Gear
          </Text>
          <View className='h-1/4'>
            <TextInput
              error={error}
              className='m-2'
              outlineColor='black'
              textColor='black'
              label="Email"
              autoCapitalize='none'
              mode='outlined'
              value={email}
              onChangeText={text => {
                seterror(false)
                setemail(text)
              }}
            />
            <TextInput
              error={error}
              autoCapitalize='none'
              className='m-2'
              outlineColor='black'
              textColor='black'
              label="Password"
              mode='outlined'
              secureTextEntry={true}
              value={password}
              onChangeText={text => {
                seterror(false)
                setpassword(text)
              }}
            />
            <Text className='m-2 color-red'>{error ? 'Email or password was invalid' : ''}</Text>
          </View>
          <Button
            textColor='white'
            className="m-3"
            disabled={email === '' || password === ''}
            mode='contained'
            onPress={onSignInPress}
          >
            Sign in
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
