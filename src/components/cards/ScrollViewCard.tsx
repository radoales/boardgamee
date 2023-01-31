import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import PatitoButton from '../PatitoButton'

interface ScrollViewCardProps {
  imageUrl: string
  name: string
  players: number[]
  rating: number
  index: number
  length: number
}

const ScrollViewCard: React.FC<ScrollViewCardProps> = ({
  name,
  imageUrl,
  players,
  rating,
  index,
  length
}) => {
  return (
    <View
      style={[
        styles.container,
        index === 0 && styles.firstChild,
        index === length - 1 && styles.LastChild
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text ellipsizeMode='tail' style={styles.title}>
          {name}
        </Text>
      </View>
      <View style={styles.inner}>
        <View style={styles.players}>
          <Ionicons name='people-outline' size={20} color={colors.orange} />
          <Text
            style={styles.playersResult}
          >{`${players[0]} - ${players[1]}`}</Text>
        </View>
        <View style={styles.players}>
          <FontAwesome name='star-o' size={20} color={colors.orange} />
          <Text style={styles.playersResult}>{`${rating.toFixed(
            1
          )}/${5}`}</Text>
        </View>
      </View>
      <PatitoButton
        style={{ borderRadius: 5 }}
        onPress={() => true}
        title='+ Favorites'
      />
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
    // borderWidth: 1,
    borderColor: colors.gray[700],
    backgroundColor: colors.white,
    borderRadius: 5,
    height: 250,
    aspectRatio: 0.6,
    marginHorizontal: 5,
    marginTop: 20,
    overflow: 'hidden'
  },
  firstChild: {
    marginLeft: 10
  },
  LastChild: {
    marginRight: 10
  },
  imageContainer: {
    height: 140,
    overflow: 'hidden',
    marginBottom: 16
  },
  image: {
    height: 100,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 8
  },
  title: {
    fontSize: 20
  },
  players: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  playersResult: {
    fontSize: 15,
    fontWeight: '300',
    paddingLeft: 5
  }
})

export default ScrollViewCard
