import { createStackNavigator } from '@react-navigation/stack'
import ResultList from './Stack/ResultList'
import HomeSearch from './Stack/HomeSearch'

export type RootStackParamList = {
  HomeSearch: undefined
  Detail: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeSearch'
        component={HomeSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Detail'
        component={ResultList}
        options={{ headerTitle: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

export default SearchStack
