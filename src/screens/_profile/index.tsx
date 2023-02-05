import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import SignIn from './stack/SignIn'
import SignUp from './stack/SignUp'
import { useEffect } from 'react'
import EditUserProfile from './stack/EditUserProfile'
import PassswordReset from './stack/PasswordReset'
import Friends from './stack/Friends'
import { StackScreenRoute } from '../../utils/routes'
import UserProfile from './stack/UserProfile'
import GameDetails from '../_search/Stack/DetailGame'

export type ProfileRootStackParamList = {
  [StackScreenRoute.LOG_IN]: undefined
  [StackScreenRoute.SIGN_UP]: undefined
  [StackScreenRoute.USER_PROFILE]: undefined
  [StackScreenRoute.EDIT_USER_PROFILE]: undefined
  [StackScreenRoute.PASSWORD_RESET]: undefined
  [StackScreenRoute.FRIENDS]: undefined
  [StackScreenRoute.GAME_DETAILS]: undefined
}

const Stack = createStackNavigator<ProfileRootStackParamList>()

const ProfileTabScreen = ({ navigation }: any) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(StackScreenRoute.USER_PROFILE)
    } else {
      navigation.navigate(StackScreenRoute.LOG_IN)
    }
  }, [isAuthenticated])
  return (
    <Stack.Navigator
      initialRouteName={
        isAuthenticated
          ? StackScreenRoute.USER_PROFILE
          : StackScreenRoute.LOG_IN
      }
    >
      <Stack.Screen
        name={StackScreenRoute.LOG_IN}
        component={SignIn}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.SIGN_UP}
        component={SignUp}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.USER_PROFILE}
        component={UserProfile}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.FRIENDS}
        component={Friends}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.EDIT_USER_PROFILE}
        component={EditUserProfile}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.PASSWORD_RESET}
        component={PassswordReset}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.GAME_DETAILS}
        component={GameDetails}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileTabScreen
