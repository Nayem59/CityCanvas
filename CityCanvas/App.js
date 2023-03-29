import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./nav/HomeStack";
import LoginStack from "./nav/LoginStack";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  );
}
