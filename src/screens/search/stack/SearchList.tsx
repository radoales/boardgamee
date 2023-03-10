import { useContext, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import PatitoInput from '../../../components/common/PatitoInput'
import { Ionicons } from '@expo/vector-icons'
import { useGetBoardgames } from '../../../hooks/atlasGames'
import { StackScreenRoute } from '../../../utils/routes'
import SearchResult from '../../../components/search/SearchResult'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import colors from '../../../styles/colors'
import { SessionContext } from '../../../hooks/sessionContext'
import { Game } from '../../../types/boardgame'
import { SearchListScreenRouteProp } from '../../../types/navigation'
import { useFeedback } from '../../../hooks/feedback'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
    paddingTop: '8%',
    backgroundColor: colors.white
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

const SearchList: React.FC<SearchListScreenRouteProp> = ({ navigation }) => {
  const [inputText, setInputText] = useState<string>('')
  const { data, isLoading, isError, isSuccess, error } = useGetBoardgames(
    inputText,
    'id,name,type,average_user_rating,num_user_ratings,thumb_url'
  )

  useFeedback(isSuccess, isError, error ?? undefined)

  const { setSelectedGame } = useContext(SessionContext)

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  const handlePress = (item: Game) => {
    setSelectedGame(item)
    navigation.navigate(StackScreenRoute.GAME_DETAILS, { title: item.name })
  }

  return (
    <View style={[styles.container]}>
      <PatitoInput
        icon={<Ionicons name='search-sharp' size={24} color='black' />}
        onChange={(e) => setInputText(e.nativeEvent.text)}
        style={{ paddingHorizontal: '3%' }}
      />

      {!isLoading && !data && (
        <Text style={styles.text}>Search using a boardgame name</Text>
      )}
      {isLoading && <ActivityIndicator size='large' />}
      {data && (
        <ScrollView>
          {data.games.map((item) => (
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

export default SearchList
