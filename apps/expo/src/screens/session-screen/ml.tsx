import React, { useEffect } from 'react';
import { View, Text } from 'react-native'
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native'
import '@tensorflow/tfjs-react-native';
import { modelDef, weights } from '@acme/ml'

export const MlTestComponenet: React.FC = () => {

  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    const handleMountTF = async () => {
      await tf.ready();
      const model = await tf.loadLayersModel(
        bundleResourceIO(modelDef, weights)
      )
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

