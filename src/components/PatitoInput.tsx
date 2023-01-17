import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  input: {
    height: 50,
    flex: 1,
  },
});

const PatitoInput = () => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name="search-sharp" size={24} color="black" />
      <TextInput style={styles.input} inlineImageLeft="search_icon" />
    </View>
  );
};

export default PatitoInput;
