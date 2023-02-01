import { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import PatitoInput from '../../../components/PatitoInput'
import { Ionicons } from '@expo/vector-icons'
import { Route } from '../../../utils/routes'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import colors from '../../../styles/colors'
import { ProfileRootStackParamList } from '..'
import { UseGetUsers } from '../../../hooks/users'
import UserSearchResult from '../../../components/users/UserSearchResult'

type Props = NativeStackScreenProps<
  ProfileRootStackParamList,
  Route.SEARCH_USERS
>

const SearchUsers = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState<string>('')
  const { data: users, isLoading } = UseGetUsers()
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

  return (
    <View style={[styles.container]}>
      <PatitoInput
        icon={<Ionicons name='search-sharp' size={24} color='black' />}
        onChange={(e) => setInputText(e.nativeEvent.text)}
      />

      {!isLoading && !users && (
        <Text style={styles.text}>Search by name or email</Text>
      )}

      {isLoading && <ActivityIndicator size='large' />}
      {users && (
        <ScrollView>
          {Object.values(users).map((item, index) => (
            <TouchableHighlight
              key={index}
              activeOpacity={0.6}
              underlayColor={colors.gray[200]}
              onPress={() => true}
            >
              <UserSearchResult data={item} />
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
    padding: '2%',
    marginHorizontal: '3%'
  },
  text: {
    margin: 'auto',
    alignSelf: 'center',
    marginVertical: 'auto',
    flex: 1,
    fontFamily: 'Montserrat_400Regular'
  }
})

export default SearchUsers
