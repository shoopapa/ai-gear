import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Record } from './record';
// import { SessionPage } from '../../pages/session/session';
import { styles, useMyTheme } from '../../perfereneces';


export type RecordParamList = {
  Record: {};
  Session: { id: string };
};

const Stack = createNativeStackNavigator<RecordParamList>();

export const RecordRoot = () => {
  const theme = useMyTheme()

  return (
    <Stack.Navigator
      initialRouteName="Record"
      screenOptions={{
        headerTintColor: theme.colors.text,
        contentStyle: styles(theme).navigatorContent,
        headerStyle: styles(theme).TabHeaderContent,
      }}
    >
      <Stack.Screen name="Record" component={Record} />
      {/* <Stack.Screen name="Session" component={SessionPage} /> */}
    </Stack.Navigator>
  );
}
