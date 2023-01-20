import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'

export type RootStackParamList = {
  HomeSearch: undefined
  Detail: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeSearch'
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Detail'
        component={SignUp}
        options={{ headerTitle: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
