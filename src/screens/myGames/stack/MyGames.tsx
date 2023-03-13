import { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import { useGetBoardgamesByIds } from '../../../hooks/atlasGames'
import SearchResult from '../../../components/search/SearchResult'
import colors from '../../../styles/colors'
import { UseGetMyGamesByUserId } from '../../../hooks/favoriteGames'
import { useAuth } from '../../../auth/AuthUserprovider'
import { MygamesScreenRouteProp } from '../../../types/navigation'
import { GameContext } from '../../../hooks/gameContext'
import { StackScreenRoute } from '../../../utils/routes'
import { Game } from '../../../types/boardgame'
import { useFeedback } from '../../../hooks/feedback'

const MyGames: React.FC<MygamesScreenRouteProp> = ({ navigation }) => {
  const [inputText, setInputText] = useState<string>('')
  const { isAuthenticated } = useAuth()
  const { data, isLoading, isSuccess, isError, error } = useGetBoardgamesByIds(
    inputText,
    'id,name,type,average_user_rating,num_user_ratings,thumb_url'
  )
  const { setSelectedGame, userId } = useContext(GameContext)
  const {
    data: myGames,
    refetch: refetchMyGames,
    isLoading: isMyGamesLoading
  } = UseGetMyGamesByUserId(userId)

  const handleRefresh = () => {
    refetchMyGames()
  }

  useFeedback(isSuccess, isError, error ?? undefined)

  useEffect(() => {
    if (myGames) {
      setInputText(myGames.map((game) => game.game_id).join(','))
    }
  }, [myGames])

  const handlePress = (item: Game) => {
    setSelectedGame(item)
    navigation.navigate(StackScreenRoute.GAME_DETAILS, { title: item.name })
  }

  return (
    <View style={[styles.container]}>
      {isAuthenticated && isLoading && <ActivityIndicator size='large' />}
      {isAuthenticated && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isMyGamesLoading}
              onRefresh={handleRefresh}
            />
          }
        >
          {data?.games.map((item) => (
            <TouchableHighlight
              key={item.id}
              activeOpacity={0.6}
              underlayColor={colors.gray[200]}
              onPress={() => handlePress(item)}
              style={styles.touchable}
            >
              <View style={styles.searchResultContainer}>
                <SearchResult data={item} />
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: '8%',
    width: '100%'
  },
  text: {
    margin: 'auto',
    alignSelf: 'center',
    marginVertical: 'auto',
    flex: 1,
    fontFamily: 'Montserrat_400Regular'
  },
  touchable: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400]
  },
  searchResultContainer: {
    paddingHorizontal: '3%'
  }
})

export default MyGames
