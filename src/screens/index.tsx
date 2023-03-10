import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabScreenRoute } from '../utils/routes'
import HomeTabScreen from './home'
import ProfileTabScreen from './profile'
import SearchTabScreen from './search'
import MyGamesTabScreen from './myGames'
import colors from '../styles/colors'
import { ComponentProps } from 'react'

const Tab = createBottomTabNavigator()

const TabMenuStackNaigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName
          if (route.name === TabScreenRoute.HOME_TAB_SCREEN) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === TabScreenRoute.MY_GAMES_TAB_SCREEN) {
            iconName = focused ? 'bookmarks-sharp' : 'bookmarks-outline'
          } else if (route.name === TabScreenRoute.SEARCH_TAB_SCREEN) {
            iconName = focused ? 'search' : 'search-outline'
          } else if (route.name === TabScreenRoute.PROFILE_TAB_SCREEN) {
            iconName = focused ? 'person' : 'person-outline'
          }

          return (
            <Ionicons
              name={iconName as ComponentProps<typeof Ionicons>['name']}
              size={size}
              color={colors.blue[600]}
            />
          )
        },
        tabBarStyle: { padding: 5 }
      })}
    >
      <Tab.Screen
        name={TabScreenRoute.HOME_TAB_SCREEN}
        component={HomeTabScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Tab.Screen
        name={TabScreenRoute.MY_GAMES_TAB_SCREEN}
        component={MyGamesTabScreen}
        options={{ headerShown: false, title: 'My Games' }}
      />
      <Tab.Screen
        name={TabScreenRoute.PROFILE_TAB_SCREEN}
        component={ProfileTabScreen}
        options={{ headerShown: false, title: 'Profile' }}
      />
      <Tab.Screen
        name={TabScreenRoute.SEARCH_TAB_SCREEN}
        component={SearchTabScreen}
        options={{ headerShown: false, title: 'Search' }}
      />
    </Tab.Navigator>
  )
}

export default TabMenuStackNaigator
