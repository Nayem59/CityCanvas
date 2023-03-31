import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Input from "../components/Input";
import AppButton from "../components/AppButton";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
			<Text className="mt-10 mb-20 text-3xl text-center">
				Welcome to <Text className="font-bold text-pink">City Canvas</Text>
			</Text>
			<View className="flex items-center justify-center w-10/12 mx-auto mb-10">
				<Input
					placeholder="Email"
					value={email}
					setState={setEmail}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<Input
					placeholder="Password"
					value={password}
					setState={setPassword}
					secure={true}
					autoCorrect={false}
				/>
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
