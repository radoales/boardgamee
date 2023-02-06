import { StyleSheet, View, Image, ScrollView } from 'react-native'
import colors from '../../../styles/colors'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat'
import { useGetPopularBoardgames } from '../../../hooks/games'
import BoardGameScrollView from '../../../components/scrollviews/BoardGamesScrollView'
import { HomeStackScreenRouteProp } from '../../../types/navigation'
import FadeInView from '../../../components/common/FadeIn'

const HomeScreen: React.FC<HomeStackScreenRouteProp> = () => {
  const { data } = useGetPopularBoardgames(
    'id,name,type,average_user_rating,num_user_ratings,thumb_url,min_players,max_players'
  )
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={[styles.container]}>
      {data?.games?.length ? (
        <ScrollView>
          <View style={styles.inner}>
            <BoardGameScrollView
              title='Featured Games'
              data={data?.games.slice(4) ?? []}
            />
            <BoardGameScrollView
              title='New Games'
              data={data?.games.slice(6) ?? []}
            />
            <BoardGameScrollView title='More Games' data={data?.games ?? []} />
          </View>
        </ScrollView>
      ) : (
        <FadeInView
          style={{
            width: '100%',
            height: '100%'
          }}
          duration={2000}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../../assets/main_logo.png')}
            />
          </View>
        </FadeInView>
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1
  },
  image: {
    height: 250,
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
