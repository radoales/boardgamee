import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native'

interface SearchResultProps {
  image: string
  name: string
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
      <Image source={{ uri: image }} style={styles.image} />
      <Text>{name}</Text>
    </View>
  )
}

export default SearchResult
