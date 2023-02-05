import { useContext, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SearchRootStackParamList } from '..'
import PatitoInput from '../../../components/PatitoInput'
import { Ionicons } from '@expo/vector-icons'
import { useGetBoardgames } from '../../../hooks/games'
import { StackScreenRoute } from '../../../utils/routes'
import SearchResult from '../../../components/search/SearchResult'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import globalStyles from '../../../styles/global'
import colors from '../../../styles/colors'
import { GameContext } from '../../../hooks/gameContext'
import { Game } from '../../../types/boardgame'
import { SearchListScreenRouteProp } from '../../../types/navigation'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
    padding: '2%'
  },
  text: {
    margin: 'auto',
    alignSelf: 'center',
    marginVertical: 'auto',
    flex: 1,
    fontFamily: 'Montserrat_400Regular'
  }
})

const SearchList: React.FC<SearchListScreenRouteProp> = ({ navigation }) => {
  const [inputText, setInputText] = useState<string>('')
  const { results, isLoading } = useGetBoardgames(
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

  const handlePress = (item: Game) => {
    setSelectedGame(item)
    navigation.navigate(StackScreenRoute.GAME_DETAILS)
  }

  return (
    <View style={[styles.container, globalStyles.container]}>
      <PatitoInput
        icon={<Ionicons name='search-sharp' size={24} color='black' />}
        onChange={(e) => setInputText(e.nativeEvent.text)}
      />

      {!isLoading && !results && (
        <Text style={styles.text}>Search using a boardgame name</Text>
      )}
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

export default SearchList
