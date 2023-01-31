import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat'
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data &&
          data.map((item, index) => (
            <ScrollViewCard
              key={index}
              name={item.name}
              imageUrl={item.thumb_url}
              players={[item.min_players, item.max_players]}
              rating={item.average_user_rating}
              index={index}
              length={data.length}
            />
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
