import { useState } from 'react'
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
import { RootStackParamList } from '..'
import PatitoInput from '../../../components/PatitoInput'
import { Ionicons } from '@expo/vector-icons'
import useGetBoardgames from '../../../hooks/useGetBoardgames'
import { Route } from '../../../utils/routes'
import SearchResult from '../../../components/search/SearchResult'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import globalStyles from '../../../styles/global'
import colors from '../../../styles/colors'

type Props = NativeStackScreenProps<RootStackParamList, Route.HOME_SEARCH>

const HomeSearch = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState<string>('')
  const { results, isLoading } = useGetBoardgames(inputText)
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

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
              onPress={() => navigation.navigate(Route.DETAIL)}
            >
              <SearchResult data={item} />
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default HomeSearch
