import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import colors from '../../../styles/colors'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat'
import { useGetBoardgames, useGetPopularBoardgames } from '../../../hooks/games'
import BoardGameScrollView from '../../../components/scrollviews/BoardGamesScrollView'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeRootStackParamList } from '..'
import { StackScreenRoute } from '../../../utils/routes'

type Props = NativeStackScreenProps<
  HomeRootStackParamList,
  StackScreenRoute.HOME
>

const HomeScreen = ({ navigation }: Props) => {
  const { results } = useGetPopularBoardgames(
    'id,name,type,average_user_rating,num_user_ratings,thumb_url,min_players,max_players'
  )
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={[styles.container]}>
      {results?.games?.length && (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../../assets/main_logo.png')}
            />
          </View>
          <View style={styles.inner}>
            <Text style={styles.title}>Discovery</Text>
            <BoardGameScrollView
              title='Featured Games'
              data={results?.games.slice(4) ?? []}
            />
            <BoardGameScrollView
              title='New Games'
              data={results?.games.slice(6) ?? []}
            />
            <BoardGameScrollView
              title='More Games'
              data={results?.games ?? []}
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '10%'
  },
  imageContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%'
  },
  image: {
    height: 50,
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginRight: '3%'
  },
  title: {
    fontSize: 50,
    fontWeight: '400',
    color: colors.gray[900],
    marginBottom: 16,
    marginLeft: '3%',
    fontFamily: 'Montserrat_700Bold'
  },
  inner: {
    height: '100%'
  }
})

export default HomeScreen
