import { createStackNavigator } from '@react-navigation/stack'
import { StackScreenRoute } from '../../utils/routes'
import GameDetails from '../../components/game/GameDetails'
import MyGames from './stack/MyGames'

export type MyGamesRootStackParamList = {
  [StackScreenRoute.MY_GAMES]: undefined
  [StackScreenRoute.GAME_DETAILS]: { title: string }
}
const Stack = createStackNavigator<MyGamesRootStackParamList>()

const MyGamesTabScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={StackScreenRoute.MY_GAMES}
        component={MyGames}
        options={{
          title: '',
          headerTitleAlign: 'center',
          headerShown: false
        }}
      />
      <Stack.Screen
        name={StackScreenRoute.GAME_DETAILS}
        component={GameDetails}
        options={({ route }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerShown: true,
          headerTitle: route.params.title
        })}
      />
    </Stack.Navigator>
  )
}

export default MyGamesTabScreen
