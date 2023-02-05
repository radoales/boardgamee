import { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import { useGetBoardgamesByIds } from '../../../hooks/games'
import SearchResult from '../../../components/search/SearchResult'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import colors from '../../../styles/colors'
import { UseGetFavoritesByUserId } from '../../../hooks/favoriteGames'
import { useAuth } from '../../../auth/AuthUserprovider'
import { FavoriteGameListScreenRouteProp } from '../../../types/navigation'
import { GameContext } from '../../../hooks/gameContext'
import { StackScreenRoute } from '../../../utils/routes'
import { Game } from '../../../types/boardgame'

const FavoriteGamesList: React.FC<FavoriteGameListScreenRouteProp> = ({
  navigation
}) => {
  const [inputText, setInputText] = useState<string>('')
  const { user } = useAuth()
  const { data: gameIds } = UseGetFavoritesByUserId(user.id)
  const { results, isLoading } = useGetBoardgamesByIds(
    inputText,
    'id,name,type,average_user_rating,num_user_ratings,thumb_url'
  )
  const { setSelectedGame } = useContext(GameContext)

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  useEffect(() => {
    if (gameIds) {
      setInputText(gameIds)
    }
  })

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      flex: 1,
      padding: '2%',
      backgroundColor: colors.white
    },
    text: {
      margin: 'auto',
      alignSelf: 'center',
      marginVertical: 'auto',
      flex: 1,
      fontFamily: 'Montserrat_400Regular'
    }
  })

  const handlePress = (item: Game) => {
    setSelectedGame(item)
    navigation.navigate(StackScreenRoute.GAME_DETAILS)
  }

  return (
    <View style={[styles.container]}>
      {isLoading && <ActivityIndicator size='large' />}
      {results && (
        <ScrollView>
          {results.games.map((item) => (
            <TouchableHighlight
              key={item.id}
              activeOpacity={0.6}
              underlayColor={colors.gray[200]}
              onPress={() => handlePress(item)}
            >
              <SearchResult data={item} />
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default FavoriteGamesList
