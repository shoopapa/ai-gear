import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Drawer, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { useMyTheme, styles } from '../../perfereneces';

// import * as MetaWear from '../../device/ios/metawear-ios';
// import DeviceContext from '../../device/device-context';

const SignOut = () => {
  const theme = useMyTheme()
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg p-4">
      <Button
        mode="contained"
        style={{ backgroundColor: theme.colors.error, margin: '2%' }}
        onPress={() => signOut()}
      >
        Sign Out
      </Button>
    </View>
  );
};

const device = {
  batteryPercent: '',
  isConnected: false,
  macAdress: '',
  downloadProgress: 0,
  signalStrength: '',
  previewStreaming: false,
  isScanning: false,
  streaming: false,
  logging: false,
};


const Connect = () => {
  const theme = useMyTheme()
  const [blinking, setblinking] = useState(false);
  // const [device] = useContext(DeviceContext);

  if (device === undefined || device.isScanning === true) {
    return <ActivityIndicator animating={true} color={theme.colors.primary} />;
  }

  if (device?.isConnected === false) {
    return (
      <Button
        mode="contained"
        style={{ backgroundColor: theme.colors.success, margin: '2%' }}
        icon="bluetooth"
        onPress={() => { }}
      >
        Connect
      </Button>
    );
  }

  if (device?.isConnected === true) {
    return (
      <>
        <Button
          mode="contained"
          style={{ backgroundColor: theme.colors.primary, margin: '2%' }}
          icon="lightbulb-on"
          onPress={async () => {
            setblinking(true);
            setblinking(false);
          }}
        >
          Blink
        </Button>
        <Button
          mode="contained"
          disabled={blinking}
          style={{ backgroundColor: theme.colors.error, margin: '2%' }}
          icon="bluetooth-off"
          onPress={() => { }}
        >
          Forget
        </Button>
      </>
    );
  }

  return null;
};

export const Device = () => {
  const theme = useMyTheme()
  return (
    <View style={styles(theme).container}>
      <Drawer.Section title="Device Info" style={{ width: '100%' }}>
        <Drawer.Item
          style={{ backgroundColor: theme.colors.gray }}
          icon="bluetooth-connect"
          label="Status"
          right={() => (
            <Text>{device?.isConnected ? 'Connected' : 'Disconnected'}</Text>
          )}
        />
        <Drawer.Item
          style={{ backgroundColor: theme.colors.gray }}
          icon="database"
          label="Mac Address"
          right={() => <Text>{device?.macAdress}</Text>}
        />
        <Drawer.Item
          style={{ backgroundColor: theme.colors.gray }}
          icon="battery"
          label="Battery"
          onPress={() => { }}
          right={() => <Text>{device?.batteryPercent}%</Text>}
        />
      </Drawer.Section>
      <Drawer.Section title="Device Options" style={{ width: '100%' }}>
        <Connect />
      </Drawer.Section>
      <Drawer.Section title="User" style={{ width: '100%' }}>
        <SignOut />
      </Drawer.Section>
    </View>
  );
}
