import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import SignIn from './stack/SignIn'
import SignUp from './stack/SignUp'
import { useEffect } from 'react'
import { Route } from '../../utils/routes'
import EditUserProfile from './stack/EditUserProfile'
import PassswordReset from './stack/PasswordReset'
import FavoriteGamesList from './stack/FavoriteGamesList'
import UserProfile from './stack/UserProfile'
import Friends from './stack/Friends'

export type ProfileRootStackParamList = {
  [Route.LOG_IN]: undefined
  [Route.SIGN_UP]: undefined
  [Route.USER_PROFILE]: undefined
  [Route.EDIT_USER_PROFILE]: undefined
  [Route.PASSWORD_RESET]: undefined
  [Route.FRIENDS]: undefined
  [Route.FAVORITE_GAMES_LIST]: undefined
}

const Stack = createStackNavigator<ProfileRootStackParamList>()

const Profile = ({ navigation }: any) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(Route.USER_PROFILE)
    } else {
      navigation.navigate(Route.LOG_IN)
    }
  }, [isAuthenticated])
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? Route.USER_PROFILE : Route.LOG_IN}
    >
      <Stack.Screen
        name={Route.LOG_IN}
        component={SignIn}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Route.SIGN_UP}
        component={SignUp}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Route.USER_PROFILE}
        component={UserProfile}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Route.FRIENDS}
        component={Friends}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Route.FAVORITE_GAMES_LIST}
        component={FavoriteGamesList}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Route.EDIT_USER_PROFILE}
        component={EditUserProfile}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Route.PASSWORD_RESET}
        component={PassswordReset}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  )
}

export default Profile
