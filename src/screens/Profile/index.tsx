import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import UserProfile from '../../components/auth/Profile'

import SignIn from '../../components/auth/SignIn'
import SignUp from '../../components/auth/SignUp'
const Stack = createStackNavigator<any>()

const Profile: React.FC = () => {
  const { isAuthenticated } = useAuth()
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
