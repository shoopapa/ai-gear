import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Device } from './device';
import { useMyTheme, styles } from '../../perfereneces';

export type DeviceParamList = {
  Device: {};
};

const Stack = createNativeStackNavigator<DeviceParamList>();

export const DeviceRoot = () => {
  const theme = useMyTheme()

  return (
    <Stack.Navigator
      initialRouteName="Device"
      screenOptions={{
        headerTintColor: theme.colors.text,
        contentStyle: styles(theme).navigatorContent,
        headerStyle: styles(theme).TabHeaderContent,
      }}
    >
      <Stack.Screen name="Device" component={Device} />
    </Stack.Navigator>
  );
}
