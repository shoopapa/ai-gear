import React, { useContext, useEffect, useState } from 'react';
// @ts-ignore
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';

import { useMyTheme, styles } from './perfereneces';
import { DeviceRoot } from './screens/device/device-tab';
import DeviceContext from './device/device-context';
import { addStateListener, StateEventPayload } from '@acme/metawear-expo';
import { RecordRoot } from './screens/record/record-tab'


export type TabParamList = {
  'home': {};
  'device-tab': {}
};
export const tabIcons: { [K in keyof TabParamList]: any } = {
  'home': (size: number, color: string) => <Ionicons name={'log-in-outline'} size={size} color={color} />,
  'device-tab': (size: number, color: string) => <Ionicons name={'ios-list'} size={size} color={color} />
};
const Tab = createBottomTabNavigator<TabParamList>();

type MainScreenProps = {}

export const RootScreen = ({ }: MainScreenProps) => {
  const theme = useMyTheme();

  const [deviceState, setdeviceState] = useState<StateEventPayload>({ connected: false, streaming: false })

  useEffect(() => {
    addStateListener((e) => {
      console.log(e)
      setdeviceState(e)
    })
  }, [])

  return (
    <DeviceContext.Provider
      value={deviceState}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarInactiveTintColor: theme.colors.text,
            tabBarIcon: ({ color, size }) => {
              return tabIcons[route.name](size, color);
            },
            headerStyle: styles(theme).TabHeaderContent,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarStyle: {
              backgroundColor: theme.colors.defaultBackgroundColor,
            },
            headerShown: false,
            contentStyle: styles(theme).navigatorContent,
          })}
        >
          <Tab.Screen
            name="home"
            options={{ tabBarLabel: 'Record' }}
            component={RecordRoot}
          />
          <Tab.Screen
            name="device-tab"
            options={{ tabBarLabel: 'Settings' }}
            component={DeviceRoot}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </DeviceContext.Provider>
  );
}
