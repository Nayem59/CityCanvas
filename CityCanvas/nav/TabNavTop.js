import React from "react";
import ArtMap from "../screens/ArtMap";
import ArtList from "../screens/ArtList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

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
};

export default TabNavTop;
