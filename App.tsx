import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Here is where we will have the games :O</Text>
      <Image
        source={require("./assets/boardgamee-high-resolution-logo-color-on-transparent-background.png")}
        style={styles.frontImage}
      />
      <StatusBar style="auto" />
    </View>
  );
}

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
