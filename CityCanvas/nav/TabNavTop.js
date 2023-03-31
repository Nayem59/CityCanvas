import React from "react";
import ArtMap from "../screens/ArtMap";
import ArtList from "../screens/ArtList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

<<<<<<< HEAD
const TabNavTop = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#C13584",
        tabBarStyle: { backgroundColor: "#ffffff" },
        tabBarIndicatorStyle: { backgroundColor: "#C13584" },
      }}
    >
      <TopTab.Screen name="Map" component={ArtMap} />
      <TopTab.Screen name="List" component={ArtList} />
    </TopTab.Navigator>
  );
=======
const TabNavTop = ({ objectProp }) => {
	return (
		<TopTab.Navigator
			screenOptions={{
				tabBarActiveTintColor: "#C13584",
				tabBarStyle: { backgroundColor: "#ffffff" },
				tabBarIndicatorStyle: { backgroundColor: "#C13584" },
			}}
		>
			<TopTab.Screen name="Map">
				{(props) => <ArtMap {...props} objectProp={objectProp} />}
			</TopTab.Screen>
			<TopTab.Screen name="List">
				{(props) => <ArtList {...props} objectProp={objectProp} />}
			</TopTab.Screen>
		</TopTab.Navigator>
	);
>>>>>>> 9856ef49dff5b018d234c0024d02f0f6602e4e26
};

export default TabNavTop;
