import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useMyTheme } from '../perfereneces';

type SessionChartProps = {
  data: number[][];
  disabled?: boolean;
  epochStart?: number
  epochEnd?: number
  sections?: number[]
};

const lineColors = [
  'rgba(210,77,90,1)',
  'rgba(156,209,72,1)',
  'rgba(178,143,220,1)',
  'rgba(150,150,150,1)',
];
const disabledLineColors = [
  'rgba(210,77,90,0.5)',
  'rgba(156,209,72,0.5)',
  'rgba(178,143,220,0.5)',
  'rgba(150,150,150,0.5)',
];

export const SessionChart = ({ data, disabled }: SessionChartProps) => {
  const theme = useMyTheme()
  return (
    <View style={{
      height: '100%',
      width: '100%',
    }}>
      <LineChart
        withShadow={false}
        style={{
          marginBottom: -40,
          marginLeft: -20,
          marginTop: 20,
          position: 'absolute',
          backgroundColor: theme.colors.defaultBackgroundColor,
        }}
        data={{
          labels: ['time'],
          datasets: [
            ...data.map((d, i) => {
              const dc = disabledLineColors[i] ?? 'white'
              const lc = lineColors[i] ?? 'white'
              return {
                data: d,
                color: () => (disabled ? dc : lc)
              };
            }),
            { data: [6, -6], color: () => 'rgba(0,0,0,0)' },
          ]
        }}
        formatYLabel={(v) => {
          if (v === 'NaN') {
            return '0g';
          }
          return parseFloat(v).toFixed(1) + 'g';
        }}
        formatXLabel={() => ''}
        withVerticalLines={false}
        // withHorizontalLines={false}
        withDots={false}
        withInnerLines={false}
        width={Dimensions.get('window').width} // moving to middle cuz i got rid of y labels
        bezier
        height={240}
        chartConfig={{
          labelColor: () => theme.colors.text,
          propsForBackgroundLines: {
            strokeDasharray: null,
          },
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional,
        }}
      />

    </View>
  );
}
