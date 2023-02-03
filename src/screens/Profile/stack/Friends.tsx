import { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Route } from '../../../utils/routes'
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat'
import colors from '../../../styles/colors'
import { ProfileRootStackParamList } from '..'
import { UseGetUserFriendsById } from '../../../hooks/users'
import { useAuth } from '../../../auth/AuthUserprovider'
import UserCard from '../../../components/users/UserSearchResult'

type Props = NativeStackScreenProps<ProfileRootStackParamList, Route.FRIENDS>

const Friends = ({ navigation }: Props) => {
  const { user } = useAuth()
  const { data: users, isLoading } = UseGetUserFriendsById(user.id)
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  })

  console.log('users', users)

  return (
    <View style={[styles.container]}>
      {isLoading && <ActivityIndicator size='large' />}
      {users && (
        <ScrollView>
          {users.map((user, index) => (
            <TouchableHighlight
              key={index}
              activeOpacity={0.6}
              underlayColor={colors.gray[200]}
              onPress={() => true}
            >
              <UserCard data={user} />
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

export default Friends
