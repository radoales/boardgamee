import { useContext } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GameContext } from '../../../hooks/gameContext'
import globalStyles from '../../../styles/global'
import colors from '../../../styles/colors'
import PatitoButton from '../../../components/common/PatitoButton'
import { useAuth } from '../../../auth/AuthUserprovider'
import {
  UseAddGameToMyGamesWithUserId,
  UseGetMyGamesByUserId,
  UseRemoveGamefromMyGamesWithUserId
} from '../../../hooks/favoriteGames'
import Rating from '../../../components/game/Rating'

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: colors.white },
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

const GameDetails: React.FC = () => {
  const { selectedGame } = useContext(GameContext)
  const { isAuthenticated, user } = useAuth()
  const { data: gameIds } = UseGetMyGamesByUserId(user.id)
  const { addToMyGames } = UseAddGameToMyGamesWithUserId(user.id)
  const { removeFromMyGames } = UseRemoveGamefromMyGamesWithUserId(user.id)

  const handleAdd = () => {
    if (isAuthenticated) {
      !gameIds?.includes(selectedGame.id)
        ? addToMyGames(selectedGame.id)
        : removeFromMyGames(selectedGame.id)
    }
  }

  return (
    <View style={[styles.container, globalStyles.container]}>
      <ScrollView style={{ width: '100%' }}>
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
          <PatitoButton
            type={!gameIds?.includes(selectedGame.id) ? 'primary' : 'secondary'}
            style={{ borderRadius: 5 }}
            onPress={handleAdd}
            title={
              !gameIds?.includes(selectedGame.id)
                ? '+ Favorites'
                : '- Favorites'
            }
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default GameDetails
