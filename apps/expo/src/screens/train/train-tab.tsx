import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TrainPage } from './train-page';
import { styles, useMyTheme } from '../../perfereneces';
import { MovesPage } from './moves-page';


export type TrainParamsList = {
  Train: { moveId: string };
  Moves: {};
};

const Stack = createNativeStackNavigator<TrainParamsList>();

export const TrainTab = () => {
  const theme = useMyTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: 'white' },
        headerStyle: styles(theme).TabHeaderContent,
      }}
      initialRouteName="Moves"
    >
      <Stack.Screen name="Train" component={TrainPage} />
      <Stack.Screen name="Moves" component={MovesPage} />
    </Stack.Navigator>
  );
}
