import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { MoveList } from '../../components/move-list'
import { TrainParamsList } from './train-tab'


type MovesPageProps = BottomTabScreenProps<TrainParamsList, 'Moves'>
export const MovesPage = ({ navigation }: MovesPageProps) => {
  const openModal = () => {

  }

  return (
    <View>
      <MoveList
        navigate={(id) => {
          navigation.navigate('Train', { moveId: id });
        }}
      />
      <Button
        textColor='white'
        className="m-10 bg-red"
        mode='contained'
        onPress={openModal}
      >New</Button>
    </View >
  )
}
