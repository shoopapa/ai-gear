import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { useMyTheme, styles } from '../../perfereneces';

import { battery, blink, connectToRemembered, connnect, forget } from '@acme/metawear-expo'
import DeviceContext from '../../device/device-context';
import { InfoCard } from '../../components/info-card';

const SignOut = () => {
  const theme = useMyTheme()
  const { signOut } = useAuth();
  return (
    <View >
      <Button
        mode="contained"
        style={{ backgroundColor: theme.colors.error, margin: '2%' }}
        onPress={() => signOut()}
        textColor='white'
      >
        Sign Out
      </Button>
    </View>
  );
};

const device = {
  batteryPercent: '',
  isConnected: true,
  macAdress: 'poop:mc:donalds',
  downloadProgress: 0,
  signalStrength: '',
  previewStreaming: false,
  isScanning: false,
  streaming: false,
  logging: false,
};


const Connect = () => {
  const theme = useMyTheme()
  const [blinking, setblinking] = useState(false)

  const { connected, scanning } = useContext(DeviceContext)

  if (scanning === true) {
    return <ActivityIndicator animating={true} color={theme.colors.primary} />;
  }

  if (connected === false) {
    return (
      <Button
        mode="contained"
        style={{ backgroundColor: theme.colors.success, margin: '2%' }}
        icon="bluetooth"
        textColor='white'
        onPress={connnect}
      >
        Connect
      </Button>
    );
  }

  return (
    <>
      <Button
        className='m-2'
        style={{ backgroundColor: theme.colors.primary }}
        mode="contained"
        textColor='white'
        icon="lightbulb-on"
        onPress={async () => {
          setblinking(true);
          await blink()
          setblinking(false);
        }}
      >
        Blink
      </Button>
      <Button
        className='m-2'
        style={{ backgroundColor: theme.colors.error }}
        mode="contained"
        textColor='white'
        disabled={blinking}
        icon="bluetooth-off"
        onPress={forget}
      >
        Forget
      </Button>
    </>
  );
};

export const Device = () => {
  const theme = useMyTheme()
  const { mac, connected } = useContext(DeviceContext)

  const [bat, setBat] = useState("")
  useEffect(() => {
    if (connected === false) {
      setBat('')
    } else {
      battery().then(b => setBat(b))
    }
  }, [connected])

  return (
    <View style={styles(theme).container}>
      <View className='w-11/12'>
        <Text className='m-3 color-black border-1 border-gray-300 text-l'>Device Info</Text>
        <InfoCard icon='bluetooth' textLeft='Status' textRight={connected ? 'Connected' : 'Disconnected'} />
        <View className='p-2'></View>
        <InfoCard icon='server' textLeft='Mac Address' textRight={mac} />
        <View className='p-2'></View>
        <InfoCard icon='battery-half-sharp' textLeft='Battery' textRight={bat ? bat + '%' : ''} />
      </View>
      <View className='w-full'>
        <Text className='m-5 color-black border-1 border-gray-300 text-l'>Options</Text>
        <Connect />
      </View>
      <View className='w-full'>
        <Text className='m-5 color-black border-1 border-gray-300 text-l'>User</Text>
        <SignOut />

      </View>
    </View>
  );
}

