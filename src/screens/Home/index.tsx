import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import colors from '../../styles/colors'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import useGetBoardgames from '../../hooks/useGetBoardgames'
import ScrollViewCard from '../../components/cards/ScrollViewCard'
import globalStyles from '../../styles/global'
import BoardGameScrollView from '../../components/scrollviews/BoardGamesScrollView'

const Home: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

  const { results, isLoading } = useGetBoardgames(
    'catan',
    'id,name,type,average_user_rating,num_user_ratings,thumb_url,min_players,max_players'
  )
  return (
    <View style={[styles.container, globalStyles.container]}>
      {results?.games?.length && (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../assets/main_logo.png')}
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
    justifyContent: 'flex-start'
  },
  imageContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%'
  },
  image: {
    height: 50,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  },
  text: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 48
  },
  title: {
    fontSize: 50,
    fontWeight: '500',
    color: colors.gray[900]
  },
  inner: {
    height: 1000
  }
})

export default Home
