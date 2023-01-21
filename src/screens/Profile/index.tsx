import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import UserProfile from '../../components/auth/UserProfile'

import SignIn from '../../components/auth/SignIn'
import SignUp from '../../components/auth/SignUp'
import { useEffect } from 'react'

export type ProfileRootStackParamList = {
  LogIn: undefined
  SignUp: undefined
  UserProfile: undefined
}
const Stack = createStackNavigator<ProfileRootStackParamList>()

const Profile = ({ navigation }: any) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('UserProfile')
    } else {
      navigation.navigate('LogIn')
    }
  }, [isAuthenticated])
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'UserProfile' : 'LogIn'}
    >
      <Stack.Screen
        name='LogIn'
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserProfile'
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Profile
