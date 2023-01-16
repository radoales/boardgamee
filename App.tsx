import * as React from "react"
import { View, Text, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const Tab = createBottomTabNavigator()

function TabMenuStackNaigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='DetailsScreen' component={DetailsScreen} />
    </Tab.Navigator>
  )
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  )
}

function App() {
  return (
    <NavigationContainer>
      <TabMenuStackNaigator />
    </NavigationContainer>
  )
}

export default App
