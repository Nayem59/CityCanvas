import React from "react";
import AddArt from "../screens/AddArt";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const HomeStack = ({ uid }) => {
	const [renderComponent, setRenderComponent] = useState(false);

	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false, tabBarActiveTintColor: "#C13584" }}
			initialRouteName="Home"
		>
			<Tab.Screen
				name="Home"
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? "md-home" : "home-outline"}
							size={34}
							color={focused ? "#C13584" : "#BDBABA"}
						/>
					),
				}}
			>
				{(props) => (
					<Home
						{...props}
						objectProp={{ renderComponent, setRenderComponent }}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="AddArt"
				options={{
					tabBarLabel: "Add Art",
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? "add-circle" : "add-circle-outline"}
							size={34}
							color={focused ? "#C13584" : "#BDBABA"}
						/>
					),
				}}
			>
				{(props) => (
					<AddArt
						{...props}
						setRenderComponent={setRenderComponent}
						renderComponent={renderComponent}
						uid={uid}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="Profile"
				// component={Profile}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? "person-circle" : "person-circle-outline"}
							size={34}
							color={focused ? "#C13584" : "#BDBABA"}
						/>
					),
				}}
			>
				{(props) => <Profile {...props} uid={uid} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default HomeStack;
