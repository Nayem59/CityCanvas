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
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="md-home" size={size} color={color} />
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
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="md-add-circle" size={size} color={color} />
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
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="md-person" size={size} color={color} />
					),
				}}
			>
				{(props) => <Profile {...props} uid={uid} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default HomeStack;
