import React, { useContext, useState, useRef } from 'react';
import { View } from 'react-native';

import { Button } from 'react-native-paper';
import DeviceContext from '../../device/device-context';

// import { DownloadModal } from './download-modal';
import { simpleSection } from './session-logger'
import { useMyTheme } from '../../perfereneces';

type LoggingControlsProps = {
  sections: simpleSection[]
  previewData: number[];
  PreviewEvent: (number: number) => void;
  clearData: () => void;
}

export const LoggingControls =
  ({ PreviewEvent, previewData, clearData }: LoggingControlsProps) => {
    const theme = useMyTheme()
    const { colors } = theme;
    const [downloadModalVis, setdownloadModalVis] = useState(false);
    const { connected, streaming } = useContext(DeviceContext)

    const buttons = () => {
      if (previewData.length === 0) {
        return (
          <Button
            mode="contained"
            disabled={connected}
            style={{
              backgroundColor: colors.primary,
              margin: '2%',
              width: '100%',
            }}
            onPress={() => {
              clearData();
              // MetaWear.onPreviewData(PreviewEvent);
              // MetaWear.startPreviewStream();
              // MetaWear.startLog();
            }}
          >
            start
          </Button>
        );
      }

      return (
        <Button
          mode="contained"
          style={{
            margin: '2%',
            width: '100%',
            backgroundColor: colors.error,
          }}
          onPress={() => {
            // MetaWear.stopPreviewStream();
            // MetaWear.stopLog();
            setdownloadModalVis(true);
          }}
        >
          Stop
        </Button>
      );
    };

    const onDownload = async (name: string) => {
      // const { linearAcceration, quaternion } = await MetaWear.downloadLog();
      // await saveSession(linearAcceration, quaternion, name, sections);
      setdownloadModalVis(false);
      clearData();
    };

    return (
      <View
        style={{
          width: '100%',
          paddingHorizontal: '5%',
          height: '30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '-18%'
        }}
      >
        {buttons()}
        {/* <DownloadModal
          onDelete={() => {
            clearData();
            setdownloadModalVis(false);
          }}
          setvis={setdownloadModalVis}
          vis={downloadModalVis}
          onDownload={onDownload}
        /> */}
      </View>
    );
  }
