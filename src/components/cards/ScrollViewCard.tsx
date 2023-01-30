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
      <Text>{name}</Text>
      <View style={styles.inner}>
        <Ionicons name='people-outline' size={24} color={colors.orange} />
        <Text>{players[0] - players[1]}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 10,
    borderWidth: 2,
    borderColor: colors.blue[100],
    borderRadius: 15,
    height: 200,
    aspectRatio: 1,
    margin: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    position: 'relative',
    bottom: 40,
    height: 150,
    overflow: 'hidden'
  },
  image: {
    height: 200,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})

export default ScrollViewCard
