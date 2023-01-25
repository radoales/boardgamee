import { StyleSheet, View, Image, Text } from 'react-native'
import colors from '../../styles/colors'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue[50],
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 220,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  },
  text: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 48
  }
})

const Home: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/boardgamee-high-resolution-logo-color-on-transparent-background.png')}
      />
      <Text style={styles.text}>Here we will show featured games</Text>
    </View>
  )
}

export default Home
