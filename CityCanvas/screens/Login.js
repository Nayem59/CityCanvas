import {
	Text,
	SafeAreaView,
	TextInput,
	Alert,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Input from "../components/Input";
import AppButton from "../components/AppButton";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [seePassword, setSeePassword] = useState(true);

	const icon = seePassword ? "eye" : "eye-off";

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {})
			.catch((error) => {
				console.log(error);
				Alert.alert("Wrong email or password");
			});
	};

	const SignUp = () => {
		navigation.navigate("SignUp");
	};

	return (
		<SafeAreaView className="w-full h-full bg-white">
			<StatusBar style="dark" />
			<View className="flex items-center justify-center mt-10 mb-10">
				<Text className="text-2xl text-stone-600">Welcome to</Text>
				<Text className="text-4xl font-bold text-pink">City Canvas</Text>
			</View>
			<View className="flex items-center justify-center w-10/12 mx-auto mb-10 ">
				<Input
					placeholder="Email"
					value={email}
					setState={setEmail}
					autoCapitalize="none"
					autoCorrect={false}
				/>

				<View className="flex flex-row justify-between w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink ">
					<TextInput
						placeholder="Password"
						value={password}
						onChangeText={(input) => setPassword(input)}
						autoCapitalize="none"
						secureTextEntry={seePassword}
						autoCorrect={true}
						className="w-40"
					/>
					<TouchableOpacity
						onPress={() => setSeePassword(!seePassword)}
						className="px-2"
					>
						<Feather
							name={icon}
							size={20}
							color={seePassword ? "#d3d3d3" : "#C13584"}
						/>
					</TouchableOpacity>
				</View>

				<AppButton
					title={"sign in"}
					handlePress={signIn}
					primary={true}
					icon={"user"}
				/>
			</View>
			<View className="flex flex-row justify-center mt-6">
				<View className="w-2/5 mt-4 border-t border-stone-300 "></View>
				<Text className="mx-5 text-lg border text-start text-stone-400">
					or
				</Text>
				<View className="w-2/5 mt-4 border-t border-stone-300"></View>
				<View></View>
			</View>

			<View className="flex items-center justify-center w-10/12 mx-auto mt-6 h-96 ">
				<AppButton
					title={"Sign in with Apple"}
					primary={false}
					icon={"apple1"}
				/>
				<AppButton
					title={"Sign in with GOOGLE"}
					primary={false}
					icon={"google"}
				/>
				<Text className="mt-20 mb-2 text-stone-500">Not signed up yet?</Text>
				<AppButton
					title={"Create an account"}
					handlePress={SignUp}
					primary={true}
					icon={"adduser"}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Login;
