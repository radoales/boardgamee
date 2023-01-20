import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '..'
import PatitoInput from '../../../components/PatitoInput'
import { Ionicons } from '@expo/vector-icons'
import useDebounce from '../../../hooks/useDebounce'
import useGetBoardgames from '../../../hooks/useGetBoardgames'

type Props = NativeStackScreenProps<RootStackParamList, 'HomeSearch'>

const HomeSearch = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState<string>('')
  const value = useDebounce(inputText)
  const { results } = useGetBoardgames(value)
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
      padding: '2%'
    }
  })
  return (
    <View style={styles.container}>
      <PatitoInput
        icon={<Ionicons name='search-sharp' size={24} color='black' />}
        onChange={(e) => setInputText(e.nativeEvent.text)}
      />
      <Text onPress={() => navigation.navigate('Detail')}>Search Screen</Text>
    </View>
  )
}

export default HomeSearch
