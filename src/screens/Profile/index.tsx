import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import UserProfile from '../../components/auth/UserProfile'
import SignIn from '../../components/auth/signIn'
import SignUp from '../../components/auth/SignUp'
import { useEffect } from 'react'
import { Route } from '../../utils/routes'
import EditUserProfile from '../../components/auth/EditUserProfile'
import PassswordReset from '../../components/auth/PasswordReset'

export type ProfileRootStackParamList = {
  LogIn: undefined
  SignUp: undefined
  UserProfile: undefined
  EditUserProfile: undefined
  PasswordReset: undefined
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
      <Stack.Screen name={Route.USER_PROFILE} component={UserProfile} />
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
