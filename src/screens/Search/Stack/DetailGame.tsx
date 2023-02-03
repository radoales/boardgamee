import { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { GameContext } from '../../../hooks/gameContext'
import Rating from '../../../components/game/Rating'
import globalStyles from '../../../styles/global'
import colors from '../../../styles/colors'
import PatitoButton from '../../../components/PatitoButton'
import { useAuth } from '../../../auth/AuthUserprovider'

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  imageContainer: {
    height: 370,
    width: '100%',
    justifyContent: 'flex-end'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1
  },
  contentContainer: {
    width: '100%',
    flex: 1
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '5%'
  },
  type: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.gray[700],
    textTransform: 'capitalize'
  },
  title: {
    fontSize: 24,
    lineHeight: 24,
    paddingTop: '1.5%',
    paddingBottom: '5%'
  }
})

const DetailGame: React.FC = () => {
  const { selectedGame } = useContext(GameContext)
  const { isAuthenticated } = useAuth()

  const handleAdd = () => {
    if (isAuthenticated) {
      console.log('navigate to profile')
    } else {
      console.log('add')
    }
  }

  return (
    <>
      <View style={[styles.container, globalStyles.container]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: selectedGame.thumb_url }}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.subHeader}>
            <Rating rating={selectedGame.average_user_rating} />
            <Text style={styles.type}>
              {selectedGame.num_user_ratings} ratings{' '}
            </Text>
          </View>
          <Text style={styles.type}>{selectedGame.type} </Text>
          <Text style={styles.title}>{selectedGame.name}</Text>
          <PatitoButton title='Add to Favourites' onPress={handleAdd} />
        </View>
      </View>
    </>
  )
}

export default DetailGame
