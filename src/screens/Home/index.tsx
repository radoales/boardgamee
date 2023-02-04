import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import { useEffect } from 'react'
import { Route } from '../../utils/routes'
import HomeScreen from './stacks'
import GameDetails from '../Search/Stack/DetailGame'

export type HomeRootStackParamList = {
  [Route.HOME]: undefined
  [Route.GAME_DETAILS]: undefined
}
const Stack = createStackNavigator<HomeRootStackParamList>()

const HomeTab = ({ navigation }: any) => {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(Route.USER_PROFILE)
    } else {
      navigation.navigate(Route.LOG_IN)
    }
  }, [isAuthenticated])
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.HOME}
        component={HomeScreen}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={Route.GAME_DETAILS}
        component={GameDetails}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeTab
