import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium
} from '@expo-google-fonts/montserrat'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  useWindowDimensions,
  View
} from 'react-native'
import { useAuth } from '../../auth/AuthUserprovider'
import {
  UseAddGameToMyGamesWithUserId,
  UseGetMyGamesByUserId,
  UseRemoveGamefromMyGamesWithUserId
} from '../../hooks/favoriteGames'
import colors from '../../styles/colors'
import { Game } from '../../types/boardgame'
import Rating from '../game/Rating'
import { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../hooks/gameContext'
import { useGetBoardgamesByIds } from '../../hooks/games'
import RenderHTML from 'react-native-render-html'

const GameDetails: React.FC = () => {
  const { width } = useWindowDimensions()
  const { selectedGame } = useContext(GameContext)
  const { isAuthenticated, user } = useAuth()
  const { data: gameIds } = UseGetMyGamesByUserId(user.id)
  const { addToMyGames } = UseAddGameToMyGamesWithUserId(user.id)
  const { removeFromMyGames } = UseRemoveGamefromMyGamesWithUserId(user.id)
  const { data: games, isLoading } = useGetBoardgamesByIds(selectedGame.id)
  const [game, setGame] = useState<Game>()

  useEffect(() => {
    if (games) {
      setGame(games.games[0])
    }
  }, [games])

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium
  })
  if (!fontsLoaded) {
    return null
  }

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
    <View style={[styles.container]}>
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
            <View style={[styles.section, styles.detailSection]}>
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
            <View style={styles.section}>
              <Text>Description</Text>
              <RenderHTML
                baseStyle={{ fontSize: 18 }}
                contentWidth={width}
                source={{ html: game.description }}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  )
}

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
  },
  titleContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    backgroundColor: colors.blue[100],
    width: '100%',
    display: 'flex',
    padding: 10,
    marginVertical: 15
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
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

export default GameDetails
