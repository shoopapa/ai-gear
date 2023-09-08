import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { MoveList } from '../../components/move-list'
import { TrainParamsList } from './train-tab'


type MovesPageProps = BottomTabScreenProps<TrainParamsList, 'Moves'>
export const MovesPage = ({ navigation }: MovesPageProps) => {

  return (
    <View>
      <MoveList
        navigate={(id) => {
          navigation.navigate('Train', { moveId: id });
        }}
      />
    </View >
  )
}
