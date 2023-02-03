import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium
} from '@expo-google-fonts/montserrat'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import { Game } from '../../types/boardgame'
import Rating from '../game/Rating'

interface SearchResultProps {
  data: Game
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium
  })

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.thumb_url }} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.header}>{data.type}</Text>
        <Text style={styles.name}>{data.name}</Text>
        <Rating rating={data.average_user_rating} />
        <Text style={styles.rating}>
          {Math.round(data.num_user_ratings)} ratings
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: '3%'
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: undefined,
    width: 80,
    paddingRight: 10,
    aspectRatio: 1 / 1
  },
  textContainer: {
    paddingLeft: 10
  },
  header: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
    lineHeight: 24,
    color: colors.gray[700],
    textTransform: 'capitalize'
  },
  name: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    lineHeight: 24,
    color: '#000',
    marginBottom: 2
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 2
  }
})

export default SearchResult
