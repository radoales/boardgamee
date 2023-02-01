import { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import { GameContext } from '../../../hooks/gameContext'

const DetailGame: React.FC = () => {
  const { selectedGame } = useContext(GameContext)
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{ uri: selectedGame.image_url }} />
        <Text>DetailGame Screen</Text>
      </View>
    </>
  )
}

export default DetailGame
