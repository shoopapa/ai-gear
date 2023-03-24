import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { Pressable, View } from 'react-native';

import { SessionChart } from '../../components/session-chart';
import { RecordParamList } from './record-tab';
// import { LinearAccerationType, QuaternionType } from '../../types/data-format';

import { LoggingControls } from './LoggingControls';
import Constants from 'expo-constants';
import { styles, useMyTheme } from '../../perfereneces';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import DeviceContext from '../../device/device-context';

export type simpleSection = { start?: number, end?: number }

type SessionScreenProps = BottomTabScreenProps<RecordParamList, 'Record'>

export const SessionLogger = (props: SessionScreenProps) => {
  const linearAcceration = useRef([[], [], [], []]);
  const quaternion = useRef([[], [], [], [], []]);
  const [previewData, setPreviewData] = useState<number[]>([]);
  const [sectionData, setsectionData] = useState<number[]>([]);
  const sample = useRef(0);
  const pressed = useRef(false);

  const theme = useMyTheme()
  const { connected, streaming } = useContext(DeviceContext)

  const [sections, setSections] = useState<simpleSection[]>([])

  const clearData = () => {
    linearAcceration.current = [[], [], [], []];
    quaternion.current = [[], [], [], [], []];
    setPreviewData([]);
    setsectionData([]);
  };

  useEffect(() => {
    setsectionData(v => {
      if (v.length > parseInt(Constants?.expoConfig?.extra?.PREVIEW_DATA_LENGTH ?? "75", 10)) {
        v.shift();
      }
      return [...v, pressed.current ? 2 : 0]
    })
  }, [previewData])


  const PreviewEvent = useCallback((n: number = 1) => {
    if (sample.current === 4) {
      setPreviewData((v) => {
        if (v.length > parseInt(Constants?.expoConfig?.extra?.PREVIEW_DATA_LENGTH ?? "150", 10)) {
          v.shift();
        }
        return [...v, n]
      });
      sample.current = 0;
      return;
    }
    sample.current += 1;
  }, [previewData]);

  const startSection = () => {
    if (streaming === false) return;
    pressed.current = true
    const newSection: simpleSection = {
      start: Date.now() / 1000
    }
    setSections(v => ([...v, newSection]))
  }

  const endSection = () => {
    if (streaming === false) return;
    if (sections.length == 0 || sections[sections.length - 1]?.start === undefined) return;
    pressed.current = false
    setSections(v => {
      const a = v.at(v.length - 1)
      if (a) {
        a.end = Date.now() / 1000
      }
      return v
    })
  }

  return (
    <View style={{ ...styles(theme).container, alignItems: 'flex-start' }}>
      <Pressable
        onPressIn={startSection}
        onPressOut={endSection}
        pressRetentionOffset={1000}
      >
        <SessionChart data={[previewData, sectionData]} epochStart={0} epochEnd={100} />
      </Pressable>
      <LoggingControls
        sections={sections}
        previewData={previewData}
        PreviewEvent={PreviewEvent}
        clearData={clearData}
      />
    </View>
  );
}
