import { createStackNavigator } from '@react-navigation/stack'
import HomeSearch from './Stack/HomeSearch'
import { StackScreenRoute } from '../../utils/routes'
import GameDetails from './Stack/DetailGame'

export type SearchRootStackParamList = {
  [StackScreenRoute.SEARCH_LIST]: undefined
  [StackScreenRoute.GAME_DETAILS]: undefined
}

const Stack = createStackNavigator<SearchRootStackParamList>()

const SearchTabScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={StackScreenRoute.SEARCH_LIST}
        component={HomeSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={StackScreenRoute.GAME_DETAILS}
        component={GameDetails}
        options={{ headerTitle: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

export default SearchTabScreen
