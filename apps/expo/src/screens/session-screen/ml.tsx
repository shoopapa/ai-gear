import React, { useEffect } from 'react';
import { View, Text } from 'react-native'
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export const MlTestComponenet: React.FC = () => {

  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    const handleMountTF = async () => {
      await tf.ready();
      setReady(true);
    };

    handleMountTF();
  }, []);

  return (
    <View>
      {ready && <Text>TensorFlow is ready!</Text>}
    </View>
  );
};

