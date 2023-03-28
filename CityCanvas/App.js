import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <View className="flex  border border-1 bg-pink">
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Test for Tailwi1nd</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
