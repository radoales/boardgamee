import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "@expo/vector-icons/Ionicons"
const Tab = createBottomTabNavigator()


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  frontImage: {
    width: "25vw",
    height: "15vh",
    resizeMode: "contain",
  },
});

function TabMenuStackNaigator() {
  return (
    <View style={styles.container}>
      <Text>Here is where we will have the games :O</Text>
     
      <StatusBar style="auto" />
    </View>
  );
}

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName as any} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='Search' component={SearchScreen} />
    </Tab.Navigator>
  )
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen
      <Image
        source={require("./assets/boardgamee-high-resolution-logo-color-on-transparent-background.png")}
        style={styles.frontImage}
      />
      </Text>
    </View>
  )
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
    </View>
  )
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
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
