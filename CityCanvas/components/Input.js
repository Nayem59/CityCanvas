import { View, TextInput } from "react-native";
import React from "react";

const Input = ({
	placeholder,
	value,
	setEmail,
	autoCapitalize,
	secure,
	autoCorrect,
}) => {
	return (
		<View className="w-full">
			<TextInput
				placeholder={placeholder}
				value={value}
				onChangeText={(input) => setEmail(input)}
				autoCapitalize={autoCapitalize}
				secureTextEntry={secure}
				autoCorrect={autoCorrect}
				className="w-full p-3 py-4 my-2 border rounded-lg border-stone-300 focus:border-pink"
			/>
		</View>
	);
};

export default Input;
