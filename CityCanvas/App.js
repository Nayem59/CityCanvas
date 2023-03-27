import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Home from "./components/Home";

export default function App() {
  return (
    <View>
      <Home />
      <Text className="text-red-500">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
