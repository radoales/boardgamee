import { createStackNavigator } from '@react-navigation/stack'
import ResultList from './Stack/ResultList'
import HomeSearch from './Stack/HomeSearch'
import { Route } from '../../utils/routes'
import GameDetails from './Stack/DetailGame'

export type RootStackParamList = {
  HomeSearch: undefined
  GameDetails: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.HOME_SEARCH}
        component={HomeSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Route.GAME_DETAILS}
        component={GameDetails}
        options={{ headerTitle: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

export default SearchStack
