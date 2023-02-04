import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeTab from '../../screens/Home'
import Profile from '../../screens/Profile'
import SearchStack from '../../screens/Search'
import { Route } from '../../utils/routes'

const Tab = createBottomTabNavigator()

const TabMenuStackNaigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === Route.HOME) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === Route.SEARCH) {
            iconName = focused ? 'search' : 'search-outline'
          } else if (route.name === Route.PROFILE) {
            iconName = focused ? 'person' : 'person-outline'
          }
          return <Ionicons name={iconName as any} size={size} color={color} />
        },
        tabBarStyle: { padding: 5 }
      })}
    >
      <Tab.Screen
        name={Route.HOME_TAB}
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={Route.PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={Route.SEARCH}
        component={SearchStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default TabMenuStackNaigator
