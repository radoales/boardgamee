import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native'

interface SearchResultProps {
  image: ImageSourcePropType
  name: string
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    marginVertical: '3%'
  },
  image: {
    aspectRatio: 1.25,
    resizeMode: 'contain',
    height: 50,
    paddingRight: 10
  }
})

const SearchResult: React.FC<SearchResultProps> = ({ image, name }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text>{name}</Text>
    </View>
  )
}

export default SearchResult
