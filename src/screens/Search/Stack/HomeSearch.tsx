import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "..";
import PatitoInput from "../../../components/PatitoInput";

type Props = NativeStackScreenProps<RootStackParamList, "HomeSearch">;

const HomeSearch = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PatitoInput />
      <Text onPress={() => navigation.navigate("Detail")}>Search Screen</Text>
    </View>
  );
};

export default HomeSearch;
