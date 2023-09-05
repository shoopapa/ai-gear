import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInSignUp } from './signin-signup';
import { useMyTheme, styles } from '../../perfereneces';
import { NavigationContainer } from '@react-navigation/native';
import { SignInWithEmail } from './signin-with-email';
import { SignUpWithEmail } from './signup-with-email';
import { VerifyEmail } from './verify-email';

export type AuthParamList = {
  'SignInSignUp': Record<string, never>;
  'SignInWithEmail': Record<string, never>;
  'SignUpWithEmail': Record<string, never>;
  'VerifyEmail': Record<string, never>;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthRoot = () => {
  const theme = useMyTheme()

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignInSignUp"
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: theme.colors.text,
          contentStyle: styles(theme).navigatorContent,
          headerStyle: styles(theme).TabHeaderContent,
        }}
      >
        <Stack.Screen
          name="SignInSignUp"
          component={SignInSignUp}
          options={{ title: 'AI Gear', headerShown: false }}
        />
        <Stack.Screen
          name="SignInWithEmail"
          component={SignInWithEmail}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen
          name="SignUpWithEmail"
          component={SignUpWithEmail}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={{ title: 'Create Account' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
