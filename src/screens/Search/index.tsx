import { createStackNavigator } from '@react-navigation/stack'
import ResultList from './Stack/ResultList'
import HomeSearch from './Stack/HomeSearch'
import { Route } from '../../utils/routes'

export type RootStackParamList = {
  HomeSearch: undefined
  Detail: undefined
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
        name={Route.DEATIL}
        component={ResultList}
        options={{ headerTitle: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

export default SearchStack
