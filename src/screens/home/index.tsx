import { createStackNavigator } from '@react-navigation/stack'
import { StackScreenRoute } from '../../utils/routes'
import HomeScreen from './stacks'
import GameDetails from '../search/stacks/DetailGame'

export type HomeRootStackParamList = {
  [StackScreenRoute.HOME]: undefined
  [StackScreenRoute.GAME_DETAILS]: undefined
}
const Stack = createStackNavigator<HomeRootStackParamList>()

const HomeTabScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={StackScreenRoute.HOME}
        component={HomeScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerShown: false
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

export default HomeTabScreen
