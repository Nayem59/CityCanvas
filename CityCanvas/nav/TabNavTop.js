import React from "react";
import ArtMap from "../screens/ArtMap";
import ArtList from "../screens/ArtList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const TopTab = createMaterialTopTabNavigator();

const TabNavTop = ({ objectProp, locationBristol }) => {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#C13584",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#ffffff" },
        tabBarIndicatorStyle: { backgroundColor: "#C13584" },
        labelStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          focused ? (color = "#C13584") : (color = "gray");
          if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Art List") {
            iconName = "list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
    >
      <TopTab.Screen name="Map">
        {(props) => (
          <ArtMap
            {...props}
            objectProp={objectProp}
            locationBristol={locationBristol}
          />
        )}
      </TopTab.Screen>
      <TopTab.Screen name="Art List">
        {(props) => <ArtList {...props} objectProp={objectProp} />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

export default TabNavTop;
