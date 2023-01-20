import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../../components/auth/SignIn'
import SignUp from '../../components/auth/SignUp'
const Stack = createStackNavigator<any>()

const Profile: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LogIn'
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerTitle: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

export default Profile
