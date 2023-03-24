import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Record } from './record';
import { styles, useMyTheme } from '../../perfereneces';
import { SessionPage } from '../session-screen';


export type RecordParamList = {
  Record: {};
  Session: { id: string };
};

const Stack = createNativeStackNavigator<RecordParamList>();

export const RecordRoot = () => {
  const theme = useMyTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: 'white' },
        headerStyle: styles(theme).TabHeaderContent,
      }}
      initialRouteName="Record"
    >
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Session" component={SessionPage} />
    </Stack.Navigator>
  );
}
