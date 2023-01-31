import { ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import { Game } from '../../types/boardgame'
import ScrollViewCard from '../cards/ScrollViewCard'

interface BoardGameScrollViewProps {
  data: Game[]
}

const BoardGameScrollView: React.FC<BoardGameScrollViewProps> = ({ data }) => {
  return (
    <View style={styles.scroll}>
      <Text style={styles.scrollTitle}>Featured Games</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {data &&
          data.map((item, index) => (
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

const styles = StyleSheet.create({
  scroll: {},
  scrollTitle: {
    color: colors.green[700],
    fontSize: 40
  }
})

export default BoardGameScrollView
