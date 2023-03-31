import React from "react";
import AddArt from "../screens/AddArt";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> 9856ef49dff5b018d234c0024d02f0f6602e4e26

import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const HomeStack = ({ uid }) => {
<<<<<<< HEAD
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#C13584" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddArt"
        component={AddArt}
        options={{
          tabBarLabel: "Add Art",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-add-circle" size={size} color={color} />
          ),
        }}
      />
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
=======
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
				// component={AddArt}
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
>>>>>>> 9856ef49dff5b018d234c0024d02f0f6602e4e26
};

export default HomeStack;
