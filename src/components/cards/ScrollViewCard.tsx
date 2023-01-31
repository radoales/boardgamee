import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'

interface ScrollViewCardProps {
  imageUrl: string
  name: string
  players: number[]
  rating: number
}

const ScrollViewCard: React.FC<ScrollViewCardProps> = ({
  name,
  imageUrl,
  players,
  rating
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.inner}>
        <View style={styles.players}>
          <Ionicons name='people-outline' size={24} color={colors.orange} />
          <Text
            style={styles.playersResult}
          >{`${players[0]} - ${players[1]}`}</Text>
        </View>
        <View style={styles.players}>
          <Ionicons name='people-outline' size={24} color={colors.orange} />
          <Text
            style={styles.playersResult}
          >{`${players[0]} - ${players[1]}`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: colors.green[700],
    borderRadius: 15,
    height: 250,
    aspectRatio: 1,
    margin: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    height: 150,
    overflow: 'hidden',
    marginBottom: 16
  },
  image: {
    height: 200,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 25
  },
  players: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  playersResult: {
    fontSize: 20,
    fontWeight: '300',
    paddingLeft: 5
  }
})

export default ScrollViewCard
