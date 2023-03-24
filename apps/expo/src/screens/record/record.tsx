import React, { useState } from 'react';
import { RecordParamList } from './record-tab';
import { View } from 'react-native';
import { SessionLogger } from './session-logger';

import { useMyTheme } from '../../perfereneces';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


type RecordProps = BottomTabScreenProps<RecordParamList, 'Record'>

export const Record = (props: RecordProps) => {
  const theme = useMyTheme()
  const { navigation } = props;

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.defaultBackgroundColor }}
    >
      <View style={{ flex: 1 }}>
        <SessionLogger {...props} />
      </View>
    </View>
  );
}
