import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../auth/AuthUserprovider'
import {
  useAddToFavoriteGames,
  useRemoveFromFavoriteGames
} from '../../hooks/favoriteGames'
import { SessionContext } from '../../hooks/sessionContext'
import { UserGame } from '../../models/userGame'
import colors from '../../styles/colors'
import { AntDesign } from '@expo/vector-icons'

interface ScrollViewCardProps {
  imageUrl: string
  name: string
  players: number[]
  rating: number
  index: number
  length: number
  id: string
  myGames?: UserGame[]
}

const ScrollViewCard: React.FC<ScrollViewCardProps> = ({
  name,
  imageUrl,
  players,
  rating,
  index,
  length,
  id,
  myGames
}) => {
  const { isAuthenticated } = useAuth()
  const { userId } = useContext(SessionContext)
  const { mutate: addToMyGames } = useAddToFavoriteGames(userId)
  const { mutate: removeFromMyGames } = useRemoveFromFavoriteGames()

  return (
    <View
      style={[
        styles.container,
        index === 0 && styles.firstChild,
        index === length - 1 && styles.LastChild
      ]}
    >
      {isAuthenticated && (
        <View
          style={[
            styles.favoriteBox,
            !myGames?.some((game) => game.game_id === id)
              ? styles.inMygamesColor
              : styles.notInMygamesColor
          ]}
        >
          <AntDesign
            onPress={() =>
              !myGames?.some((game) => game.game_id === id)
                ? addToMyGames(id)
                : removeFromMyGames(
                    myGames.find((game) => {
                      return game.game_id === id
                    })?.id ?? ''
                  )
            }
            name={
              myGames?.some((game) => game.game_id === id) ? 'check' : 'plus'
            }
            size={25}
            color={
              myGames?.some((game) => game.game_id === id)
                ? colors.gray[700]
                : colors.gray[50]
            }
            style={{
              zIndex: 2
            }}
          />
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text ellipsizeMode='tail' style={styles.title}>
          {name.slice(0, 50)}
        </Text>
      </View>
      <View style={styles.inner}>
        <View style={styles.players}>
          <Ionicons name='people-outline' size={20} color={colors.orange} />
          <Text
            style={styles.playersResult}
          >{`${players[0]}-${players[1]}`}</Text>
        </View>
        <View style={styles.players}>
          <FontAwesome name='star-o' size={20} color={colors.orange} />
          <Text style={styles.playersResult}>{`${rating.toFixed(
            1
          )}/${5}`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
    borderColor: colors.gray[700],
    backgroundColor: colors.white,
    borderRadius: 6,
    height: 220,
    aspectRatio: 0.7,
    marginHorizontal: 5,
    marginTop: 20,
    overflow: 'hidden',
    borderWidth: 0.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  firstChild: {
    marginLeft: 10
  },
  LastChild: {
    marginRight: 10
  },
  imageContainer: {
    height: 150,
    overflow: 'hidden',
    marginBottom: 16
  },
  image: {
    height: 100,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 8
  },
  title: {
    fontSize: 18,
    paddingTop: 10,
    fontFamily: 'Montserrat_400Regular'
  },
  players: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  playersResult: {
    fontSize: 15,
    fontWeight: '300',
    paddingLeft: 5
  },
  favoriteBox: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    padding: 2,
    paddingVertical: 6,
    borderBottomStartRadius: 16,
    borderTopEndRadius: 6
  },
  inMygamesColor: {
    backgroundColor: colors.orange
  },
  notInMygamesColor: {
    backgroundColor: colors.gray[400]
  }
})

export default ScrollViewCard
