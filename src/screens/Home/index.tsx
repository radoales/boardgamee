import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import colors from '../../styles/colors'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import useGetBoardgames from '../../hooks/useGetBoardgames'

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

  const { results, isLoading } = useGetBoardgames('catan')
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/boardgamee-high-resolution-logo-color-on-transparent-background.png')}
      />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {results &&
          results.games.map((item) => (
            <Image
              key={item.id}
              source={{ uri: item.image_url }}
              style={styles.image}
            />
          ))}
      </ScrollView>
    </View>
  )
}

export default Home
