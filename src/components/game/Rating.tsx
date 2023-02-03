import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import colors from '../../styles/colors'

type Rating = {
  rating: number
}

const Rating: React.FC<Rating> = ({ rating }) => {
  const ratingWhole = Math.floor(rating)
  const ratingDecimal = rating - ratingWhole
  const remaining = ratingDecimal > 0.3 ? 5 - ratingWhole - 1 : 5 - ratingWhole
  return (
    <View style={styles.reviewContainer}>
      {Array.from({ length: ratingWhole }).map((item, index) => (
        <FontAwesome key={index} name='star' size={24} color={colors.orange} />
      ))}
      {ratingDecimal > 0.3 && (
        <FontAwesome name='star-half-empty' size={24} color={colors.orange} />
      )}
      {Array.from({ length: remaining }).map((item, index) => (
        <FontAwesome
          key={index}
          name='star-o'
          size={24}
          color={colors.orange}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 2
  }
})

export default Rating
