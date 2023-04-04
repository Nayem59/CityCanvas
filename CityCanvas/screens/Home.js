import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import TabNavTop from "../nav/TabNavTop";
import StreetArtInfo from "../screens/StreetArtInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Comments from "./Comments";

const Stack = createNativeStackNavigator();
const Home = ({ objectProp, uid }) => {
  const Bristol = {
    latitude: 51.454514,
    longitude: -2.5879,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [locationBristol, setLocationBristol] = useState(Bristol);
  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavTop">
          {(props) => (
            <TabNavTop
              {...props}
              locationBristol={locationBristol}
              objectProp={objectProp}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="StreetArtInfo">
          {(props) => (
            <StreetArtInfo {...props} locationBristol={locationBristol} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Comments">
          {(props) => <Comments {...props} uid={uid} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default Home;
