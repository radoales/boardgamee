import { ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import { Game } from '../../types/boardgame'
import ScrollViewCard from '../cards/ScrollViewCard'

interface BoardGameScrollViewProps {
  data: Game[]
  title: string
}

const BoardGameScrollView: React.FC<BoardGameScrollViewProps> = ({
  data,
  title
}) => {
  return (
    <View style={styles.scroll}>
      <Text style={styles.scrollTitle}>{title}</Text>
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
  scroll: {
    marginBottom: 16
  },
  scrollTitle: {
    color: colors.blue[700],
    fontSize: 35
  }
})

export default BoardGameScrollView
