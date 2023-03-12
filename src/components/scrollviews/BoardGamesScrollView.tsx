import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { useAuth } from '../../auth/AuthUserprovider'
import { UseGetMyGamesByUserId } from '../../hooks/favoriteGames'
import { GameContext } from '../../hooks/gameContext'
import { HomeRootStackParamList } from '../../screens/home'
import colors from '../../styles/colors'
import { Game } from '../../types/boardgame'
import { StackScreenRoute } from '../../utils/routes'
import ScrollViewCard from '../cards/ScrollViewCard'

interface BoardGameScrollViewProps {
  data: Game[]
  title: string
}

const BoardGameScrollView: React.FC<BoardGameScrollViewProps> = ({
  data,
  title
}) => {
  const { navigate } = useNavigation<NavigationProp<HomeRootStackParamList>>()
  const { user } = useAuth()
  // const { data: gameIds } = UseGetMyGamesByUserId(user.id)
  const { setSelectedGame } = useContext(GameContext)
  const handlePress = (item: Game) => {
    setSelectedGame(item)
    navigate(StackScreenRoute.GAME_DETAILS, { title: item ? item.name : '' })
  }

  return (
    <View style={styles.scroll}>
      <Text style={styles.scrollTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data &&
          data.map((item, index) => (
            <TouchableHighlight
              key={item.id}
              activeOpacity={0.6}
              underlayColor={colors.gray[200]}
              onPress={() => handlePress(item)}
            >
              <ScrollViewCard
                key={index}
                name={item.name}
                imageUrl={item.thumb_url}
                players={[item.min_players, item.max_players]}
                rating={item.average_user_rating}
                index={index}
                length={data.length}
                id={item.id}
                gameIds={''}
              />
            </TouchableHighlight>
          ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: colors.blue[50]
  },
  scrollTitle: {
    color: colors.blue[700],
    fontSize: 35,
    paddingHorizontal: '3%',
    fontWeight: '500',
    fontFamily: 'Montserrat_700Bold'
  }
})

export default BoardGameScrollView
