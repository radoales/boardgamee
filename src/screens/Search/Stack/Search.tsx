import { Text, View } from "react-native";

const Search = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => navigation.navigate("Detail")}>Search Screen</Text>
    </View>
  );
};

export default Search;
