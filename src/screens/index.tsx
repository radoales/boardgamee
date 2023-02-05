import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabScreenRoute } from '../utils/routes'
import HomeTabScreen from './Home'
import ProfileTabScreen from './Profile'
import SearchTabScreen from './Search'

const Tab = createBottomTabNavigator()

const TabMenuStackNaigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === TabScreenRoute.HOME_TAB_SCREEN) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === TabScreenRoute.SEARCH_TAB_SCREEN) {
            iconName = focused ? 'search' : 'search-outline'
          } else if (route.name === TabScreenRoute.PROFILE_TAB_SCREEN) {
            iconName = focused ? 'person' : 'person-outline'
          }
          return <Ionicons name={iconName as any} size={size} color={color} />
        },
        tabBarStyle: { padding: 5 }
      })}
    >
      <Tab.Screen
        name={'Home'}
        component={HomeTabScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileTabScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={'Search'}
        component={SearchTabScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default TabMenuStackNaigator
