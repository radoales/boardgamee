import { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import PatitoInput from '../../../components/PatitoInput'
import { Ionicons } from '@expo/vector-icons'
import { useGetBoardgames, useGetBoardgamesByIds } from '../../../hooks/games'
import SearchResult from '../../../components/search/SearchResult'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import globalStyles from '../../../styles/global'
import colors from '../../../styles/colors'
import { GameContext } from '../../../hooks/gameContext'
import { Game } from '../../../types/boardgame'
import { ProfileRootStackParamList } from '..'
import { StackScreenRoute } from '../../../utils/routes'
import { UseGetFavoritesByUserId } from '../../../hooks/favoriteGames'
import { useAuth } from '../../../auth/AuthUserprovider'

type Props = NativeStackScreenProps<
  ProfileRootStackParamList,
  StackScreenRoute.FAVORITE_GAMES_LIST
>

const FavoriteGamesList = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState<string>('')
  const { user } = useAuth()
  const { data: gameIds } = UseGetFavoritesByUserId(user.id)
  const { results, isLoading } = useGetBoardgamesByIds(
    inputText,
    'id,name,type,average_user_rating,num_user_ratings,thumb_url'
  )
  //   const { setSelectedGame } = useContext(GameContext)

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

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

  //   const handlePress = (item: Game) => {
  //     setSelectedGame(item)
  //     // navigation.navigate(StackScreenRoute.DETAIL)
  //   }

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
              onPress={() => true}
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
