import { StyleSheet, View, Image } from 'react-native'
import colors from '../../styles/colors'
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
  }
})

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/boardgamee-high-resolution-logo-color-on-transparent-background.png')}
      />
    </View>
  )
}

export default Home
