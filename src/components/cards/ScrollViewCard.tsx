import { FontAwesome, Ionicons } from '@expo/vector-icons'
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
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={styles.inner}>
        <View style={styles.players}>
          <Ionicons name='people-outline' size={24} color={colors.orange} />
          <Text
            style={styles.playersResult}
          >{`${players[0]} - ${players[1]}`}</Text>
        </View>
        <View style={styles.players}>
          <FontAwesome name='star-o' size={24} color={colors.orange} />
          <Text style={styles.playersResult}>{`${rating.toFixed(
            1
          )}/${5}`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: colors.blue[700],
    backgroundColor: colors.white,
    borderRadius: 15,
    height: 320,
    aspectRatio: 0.7,
    marginRight: 20,
    marginTop: 20,
    overflow: 'hidden'
  },
  imageContainer: {
    height: 250,
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
    justifyContent: 'space-between',
    width: '100%'
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
