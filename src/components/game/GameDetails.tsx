import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium
} from '@expo-google-fonts/montserrat'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import {
  ActivityIndicator,
  Image,
  Linking,
  // Platform,
  ScrollView,
  StyleSheet,
  Text,
  // ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
// import { useAuth } from '../../auth/AuthUserprovider'
// import {
//   useAddToFavoriteGames,
//   UseGetMyGamesByUserId,
//   useRemoveFromFavoriteGames
// } from '../../hooks/favoriteGames'
import colors from '../../styles/colors'
import { Game } from '../../types/boardgame'
import Rating from '../game/Rating'
import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from '../../hooks/gameContext'
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html'
import { useGetBoardgamesByIds } from '../../hooks/atlasGames'
import {
  useAddToFavoriteGames,
  UseGetMyGamesByUserId,
  useRemoveFromFavoriteGames
} from '../../hooks/favoriteGames'

const GameDetails: React.FC = () => {
  const { selectedGame, userId } = useContext(GameContext)
  const { data: myGames } = UseGetMyGamesByUserId(userId)
  const { mutate: addToMyGames } = useAddToFavoriteGames(userId)
  const { mutate: removeFromMyGames } = useRemoveFromFavoriteGames()
  const { data: games, isLoading } = useGetBoardgamesByIds(selectedGame.id)
  const [game, setGame] = useState<Game>()

  useEffect(() => {
    if (games) {
      setGame(games.games[0])
    }
  }, [games])

  const Description = React.memo(function Description() {
    const { width } = useWindowDimensions()
    return (
      <>
        {game && (
          <RenderHTML
            baseStyle={styles.detailText}
            systemFonts={[...defaultSystemFonts, 'Montserrat_400Regular']}
            contentWidth={width}
            source={{ html: game.description }}
          />
        )}
      </>
    )
  })

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium
  })
  if (!fontsLoaded) {
    return null
  }

  const handleAdd = () => {
    addToMyGames(selectedGame.id)
  }

  const handleRemove = () => {
    removeFromMyGames(
      myGames?.find((game) => {
        return game.game_id === selectedGame.id
      })?.id ?? ''
    )
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
              {userId.length > 0 && (
                <FontAwesome
                  onPress={
                    !myGames
                      ?.map((game) => game.game_id)
                      .join(',')
                      .includes(selectedGame.id)
                      ? handleAdd
                      : handleRemove
                  }
                  name={
                    !myGames
                      ?.map((game) => game.game_id)
                      .join(',')
                      .includes(selectedGame.id)
                      ? 'heart-o'
                      : 'heart'
                  }
                  size={40}
                  color={colors.orange}
                />
              )}
            </View>
            <View style={[styles.section, styles.detailSection]}>
              <View>
                <View style={styles.detailContainer}>
                  <Ionicons name='people-outline' size={24} color='black' />
                  <Text style={[styles.detailText, styles.spacing]}>
                    {game.min_players} - {game.max_players} players
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <AntDesign name='smileo' size={24} color='black' />
                  <Text style={[styles.detailText, styles.spacing]}>
                    {game.min_age}+ years
                  </Text>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <Ionicons name='timer-outline' size={24} color='black' />
                <Text style={[styles.detailText, styles.spacing]}>
                  {game.min_playtime} - {game.max_playtime} min.
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={[styles.title, styles.sectionTitle]}>
                Description
              </Text>
              <Description />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.title, styles.sectionTitle]}>Details</Text>
            <TouchableOpacity
              onPressOut={() => Linking.openURL(game.rules_url)}
            >
              <Text style={styles.detailTitle}>
                Click here for official rules
              </Text>
            </TouchableOpacity>
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
    height: 400
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
    textTransform: 'capitalize',
    fontFamily: 'Montserrat_400Regular'
  },
  title: {
    fontSize: 24,
    lineHeight: 24,
    paddingTop: '1.5%',
    paddingBottom: '5%',
    fontFamily: 'Montserrat_500Medium'
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
    padding: 10,
    marginVertical: 15
  },
  sectionTitle: {
    fontFamily: 'Montserrat_400Regular'
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
  spacing: {
    paddingLeft: '3%'
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular'
  },
  detailTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Montserrat_500Medium',
    marginBottom: '3%'
  }
})

export default GameDetails
