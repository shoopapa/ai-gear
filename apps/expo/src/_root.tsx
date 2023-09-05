import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';

import { useMyTheme, styles } from './perfereneces';
import { DeviceRoot } from './screens/device/device-tab';
import DeviceContext from './device/device-context';
import { addStateListener, connectToRemembered, StateEventPayload } from '@acme/metawear-expo';
import { RecordRoot } from './screens/record/record-tab'
import { TrainTab } from './screens/train/train-tab'


export type TabParamList = {
  'record-tab': Record<string, never>;
  'device-tab': Record<string, never>
  'train-tab': Record<string, never>
};
export const tabIcons = {
  'record-tab': (size, color) => <Ionicons name={'log-in-outline'} size={size} color={color} />,
  'device-tab': (size, color) => <Ionicons name={'ios-list'} size={size} color={color} />,
  'train-tab': (size, color) => <Ionicons name={'move'} size={size} color={color} />
} satisfies { [K in keyof TabParamList]: (size: number, color: string) => JSX.Element };
const Tab = createBottomTabNavigator<TabParamList>();

type MainScreenProps = Record<string, never>

export const RootScreen = ({ }: MainScreenProps) => {
  const theme = useMyTheme();

  const [deviceState, setdeviceState] = useState<StateEventPayload>({ connected: false, streaming: false, mac: "", scanning: false })

  useEffect(() => {
    addStateListener((e) => {
      setdeviceState(e)
    })
    setTimeout(() => {
      connectToRemembered()
    }, 50);
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
            name="record-tab"
            options={{ tabBarLabel: 'Record' }}
            component={RecordRoot}
          />
          <Tab.Screen
            name="train-tab"
            options={{ tabBarLabel: 'Train' }}
            component={TrainTab}
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
