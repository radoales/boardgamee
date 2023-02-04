import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../../auth/AuthUserprovider'
import { useEffect } from 'react'
import { Route } from '../../utils/routes'
import DetailGame from '../Search/Stack/DetailGame'
import HomeScreen from './stacks'

export type HomeRootStackParamList = {
  [Route.HOME]: undefined
  [Route.DETAIL]: undefined
}
const Stack = createStackNavigator<HomeRootStackParamList>()

const Home = ({ navigation }: any) => {
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
        name={Route.DETAIL}
        component={DetailGame}
        options={{
          title: '',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  )
}

export default Home
