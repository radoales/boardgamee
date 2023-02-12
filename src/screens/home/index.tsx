import { createStackNavigator } from '@react-navigation/stack'
import { StackScreenRoute } from '../../utils/routes'
import HomeScreen from './stacks'
import GameDetails from '../../components/game/GameDetails'

export type HomeRootStackParamList = {
  [StackScreenRoute.HOME]: undefined
  [StackScreenRoute.GAME_DETAILS]: { title: string }
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
          headerTitleAlign: 'left',
          headerShown: false
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.GAME_DETAILS}
        component={GameDetails}
        options={({ route }) => ({
          title: '',
          headerTitleAlign: 'left',
          headerShown: true,
          headerTitle: route.params.title
        })}
      />
    </Stack.Navigator>
  )
}

export default HomeTabScreen
