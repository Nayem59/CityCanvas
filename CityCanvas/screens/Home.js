import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import TabNavTop from "../nav/TabNavTop";
import StreetArtInfo from "../screens/StreetArtInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Home = ({ objectProp }) => {
	return (
		<SafeAreaView className="flex flex-1 bg-white">
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="TabNavTop">
					{(props) => <TabNavTop {...props} objectProp={objectProp} />}
				</Stack.Screen>
				<Stack.Screen name="StreetArtInfo" component={StreetArtInfo} />
			</Stack.Navigator>
		</SafeAreaView>
	);
};

export default Home;
