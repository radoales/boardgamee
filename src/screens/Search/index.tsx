import { createStackNavigator } from "@react-navigation/stack";
import ResultList from "./Stack/ResultList";
import Search from "./Stack/Search";

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeSearch"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={ResultList}
        options={{ headerTitle: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
