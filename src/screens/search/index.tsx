import { createStackNavigator } from '@react-navigation/stack'
import { StackScreenRoute } from '../../utils/routes'
import GameDetails from '../../components/game/GameDetails'
import SearchList from './stacks/SearchList'

export type SearchRootStackParamList = {
  [StackScreenRoute.SEARCH_LIST]: undefined
  [StackScreenRoute.GAME_DETAILS]: { title: string }
}

const Stack = createStackNavigator<SearchRootStackParamList>()

const SearchTabScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={StackScreenRoute.SEARCH_LIST}
        component={SearchList}
        options={{ headerShown: false }}
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

export default SearchTabScreen
