import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium
} from '@expo-google-fonts/montserrat'
import { FontAwesome } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../auth/AuthUserprovider'
import {
  UseAddGameToMyGamesWithUserId,
  UseGetFavoritesByUserId,
  UseRemoveGamefromMyGamesWithUserId
} from '../../hooks/favoriteGames'
import colors from '../../styles/colors'
import { Game } from '../../types/boardgame'
import Rating from '../game/Rating'

interface SearchResultProps {
  data: Game
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {
  const { user } = useAuth()
  const { data: gameIds } = UseGetFavoritesByUserId(user.id)
  const { addToFavorites } = UseAddGameToMyGamesWithUserId(user.id)
  const { removeFromFavorites } = UseRemoveGamefromMyGamesWithUserId(user.id)

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium
  })
  if (!fontsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <View style={styles.gameInfo}>
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
      <View style={styles.heartIcon}>
        <FontAwesome
          onPress={() =>
            !gameIds?.includes(data.id)
              ? addToFavorites(data.id)
              : removeFromFavorites(data.id)
          }
          name={!gameIds?.includes(data.id) ? 'heart-o' : 'heart'}
          size={40}
          color={colors.orange}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '3%'
  },
  gameInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
    marginBottom: 2,
    width: 200
  },
  rating: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
    lineHeight: 24,
    color: colors.gray[700]
  },
  heartIcon: {
    paddingRight: 10
  }
})

export default SearchResult
