import { Image, StyleSheet, View } from 'react-native'

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
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 25,
    height: 250,
    margin: 10,
    overflow: 'hidden'
  },
  image: {
    height: 220,
    aspectRatio: 1,
    resizeMode: 'contain'
  }
})

export default ScrollViewCard
