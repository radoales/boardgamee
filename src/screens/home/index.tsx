import { createStackNavigator } from '@react-navigation/stack'
import { StackScreenRoute } from '../../utils/routes'
import HomeScreen from './stacks'
import GameDetails from '../../components/game/GameDetails'
import { useAuth } from '../../auth/AuthUserprovider'
import { useContext, useEffect } from 'react'
import { SessionContext } from '../../hooks/sessionContext'
import { UseGetUserById } from '../../hooks/users'
import { useGetMyGamesByUserId } from '../../hooks/favoriteGames'

export type HomeRootStackParamList = {
  [StackScreenRoute.HOME]: undefined
  [StackScreenRoute.GAME_DETAILS]: { title: string }
}
const Stack = createStackNavigator<HomeRootStackParamList>()

const HomeTabScreen = () => {
  const { user } = useAuth()
  const { data: userDetails } = UseGetUserById(user.id)
  const { data: userGames } = useGetMyGamesByUserId()
  const { setUserId, setUserGames } = useContext(SessionContext)

  useEffect(() => {
    if (userDetails) setUserId(userDetails.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails])

  useEffect(() => {
    if (userGames) setUserGames(userGames)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGames])

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
