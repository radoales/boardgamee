import { useContext, useState, useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native'
import { GameContext } from '../../hooks/gameContext'
import globalStyles from '../../styles/global'
import colors from '../../styles/colors'
import { useAuth } from '../../auth/AuthUserprovider'
import {
  UseAddGameToMyGamesWithUserId,
  UseGetMyGamesByUserId,
  UseRemoveGamefromMyGamesWithUserId
} from '../../hooks/favoriteGames'
import Rating from './Rating'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useGetBoardgamesByIds } from '../../hooks/games'
import { Game } from '../../types/boardgame'

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
    paddingVertical: '5%',
    paddingHorizontal: '3%'
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
  },
  titleContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%'
  },
  section: {
    backgroundColor: colors.blue[50],
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'flex-start',
    marginVertical: 15
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  detailText: {
    paddingLeft: 10,
    fontSize: 16
  }
})

const GameDetails: React.FC = () => {
  const { selectedGame } = useContext(GameContext)
  const { isAuthenticated, user } = useAuth()
  const { data: gameIds } = UseGetMyGamesByUserId(user.id)
  const { addToMyGames } = UseAddGameToMyGamesWithUserId(user.id)
  const { removeFromMyGames } = UseRemoveGamefromMyGamesWithUserId(user.id)
  const { data, isLoading } = useGetBoardgamesByIds(selectedGame.id)
  const [game, setGame] = useState<Game>()

  useEffect(() => {
    if (data) {
      setGame(data.games[0])
    }
  }, [data])

  const handleAdd = () => {
    if (isAuthenticated) {
      !gameIds?.includes(selectedGame.id)
        ? addToMyGames(selectedGame.id)
        : removeFromMyGames(selectedGame.id)
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Login to save games',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        )
      }
    }
  }

  return (
    <View style={[styles.container, globalStyles.container]}>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : game ? (
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: game.thumb_url }} />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.subHeader}>
              <Rating rating={game.average_user_rating} />
              <Text style={styles.type}>{game.num_user_ratings} ratings </Text>
            </View>
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.type}>{game.type} </Text>
                <Text style={styles.title}>{game.name}</Text>
              </View>
              <FontAwesome
                onPress={handleAdd}
                name={!gameIds?.includes(game.id) ? 'heart-o' : 'heart'}
                size={40}
                color={colors.orange}
              />
            </View>
            <View style={styles.section}>
              <View>
                <View style={styles.detailContainer}>
                  <Ionicons name='people-outline' size={24} color='black' />
                  <Text style={styles.detailText}>
                    {game.min_players} - {game.max_players} players
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <AntDesign name='smileo' size={24} color='black' />
                  <Text style={styles.detailText}>{game.min_age}+ years</Text>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <Ionicons name='timer-outline' size={24} color='black' />
                <Text style={styles.detailText}>
                  {game.min_playtime} - {game.max_playtime} minutes{' '}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  )
}

export default GameDetails
