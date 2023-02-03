import { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { GameContext } from '../../../hooks/gameContext'

const styles = StyleSheet.create({
  imageContainer: {
    height: 400,
    width: '100%'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1
  }
})

const DetailGame: React.FC = () => {
  const { selectedGame } = useContext(GameContext)
  console.log('selectedGame', selectedGame)
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: selectedGame.thumb_url }}
          />
        </View>
        <Text>DetailGame Screen</Text>
      </View>
    </>
  )
}

export default DetailGame
