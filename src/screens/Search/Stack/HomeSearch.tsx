import { useState } from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '..'
import PatitoInput from '../../../components/PatitoInput'
import { Ionicons } from '@expo/vector-icons'
import useGetBoardgames from '../../../hooks/useGetBoardgames'
import { Route } from '../../../utils/routes'

type Props = NativeStackScreenProps<RootStackParamList, Route.HOME_SEARCH>

const HomeSearch = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState<string>('')
  const { results, isLoading } = useGetBoardgames(inputText)

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
      padding: '2%'
    },
    text: {
      margin: 'auto',
      alignSelf: 'center',
      marginVertical: 'auto',
      flex: 1
    }
  })
  return (
    <View style={styles.container}>
      <PatitoInput
        icon={<Ionicons name='search-sharp' size={24} color='black' />}
        onChange={(e) => setInputText(e.nativeEvent.text)}
      />
      <View
        style={styles.text}
        //onPress={() => navigation.navigate('Detail')}
      >
        {isLoading && <Text>...loading</Text>}
        <Text>Search using a boardgame name</Text>
      </View>
    </View>
  )
}

export default HomeSearch
