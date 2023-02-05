import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import { useEffect } from 'react'
import { StackScreenRoute } from '../../utils/routes'
import HomeScreen from './stacks'
import GameDetails from '../Search/Stack/DetailGame'

export type HomeRootStackParamList = {
  [StackScreenRoute.HOME]: undefined
  [StackScreenRoute.GAME_DETAILS]: undefined
}
const Stack = createStackNavigator<HomeRootStackParamList>()

const HomeTabScreen = ({ navigation }: any) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(StackScreenRoute.USER_PROFILE)
    } else {
      navigation.navigate(StackScreenRoute.LOG_IN)
    }
  }, [isAuthenticated])
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
