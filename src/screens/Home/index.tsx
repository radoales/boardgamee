import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import colors from '../../styles/colors'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import useGetBoardgames from '../../hooks/useGetBoardgames'
import ScrollViewCard from '../../components/cards/ScrollViewCard'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  image: {
    height: 220,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  },
  text: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 48
  },
  scroll: {
    paddingTop: 50
  }
})

const Home: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

  const { results, isLoading } = useGetBoardgames(
    'catan',
    'id,name,type,average_user_rating,num_user_ratings,image_url,thumb_url'
  )
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/main_logo.png')}
      />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {results &&
          results.games.map((item, index) => (
            <ScrollViewCard
              key={index}
              name={item.name}
              imageUrl={item.thumb_url}
              players={[item.min_players, item.max_players]}
              rating={item.average_user_rating}
            />
          ))}
      </ScrollView>
    </View>
  )
}

export default Home
