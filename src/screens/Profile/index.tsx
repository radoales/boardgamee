import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import UserProfile from '../../components/auth/UserProfile'

import SignIn from '../../components/auth/SignIn'
import SignUp from '../../components/auth/SignUp'
import { useEffect } from 'react'
import { Route } from '../../utils/routes'
import EditUserProfile from '../../components/auth/EditUserProfile'

export type ProfileRootStackParamList = {
  LogIn: undefined
  SignUp: undefined
  UserProfile: undefined
  EditUserProfile: undefined
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
      <Stack.Screen name={Route.LOG_IN} component={SignIn} />
      <Stack.Screen name={Route.SIGN_UP} component={SignUp} />
      <Stack.Screen name={Route.USER_PROFILE} component={UserProfile} />
      <Stack.Screen
        name={Route.EDIT_USER_PROFILE}
        component={EditUserProfile}
      />
    </Stack.Navigator>
  )
}

export default Profile
