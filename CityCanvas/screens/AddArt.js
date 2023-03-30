import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import AppButton from "../components/AppButton";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
const AddArt = () => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const onChange = ({ type }, selectedDate) => {
		if (type == "set") {
			const currentDate = selectedDate;
			setDate(currentDate);
		} else {
			togglePicker();
		}
	};

	const streetArtTypes = [
		{ key: "1", value: "Graffiti" },
		{ key: "2", value: "Stencil Art" },
		{ key: "3", value: "Mural Art" },
		{ key: "4", value: "Sticker Art" },
		{ key: "5", value: "Yarn Bombing" },
		{ key: "6", value: "Paste Up Art" },
		{ key: "7", value: "Installation Art" },
		{ key: "8", value: "Reverse Graffiti" },
	];

	const togglePicker = () => {
		setShowPicker(!showPicker);
	};

	return (
		<SafeAreaView className="items-center justify-center w-full h-full bg-white">
			<Text className="mt-10 mb-10 text-3xl text-center">Post Art</Text>
			<View className="w-10/12">
				<View className="w-full">
					<TextInput
						placeholder={"Image"}
						autoCapitalize="none"
						className="w-full p-3 py-4 my-2 border rounded-lg border-stone-300 focus:border-pink"
					/>
				</View>

				<Input placeholder={"Art Name"} />
				<View className="flex flex-row w-full p-3 py-2 my-2 border rounded-lg border-stone-300 focus:border-pink">
					{showPicker && (
						<DateTimePicker
							mode="date"
							value={date}
							textColor="black"
							// display="spinner"
							onChange={onChange}
							placeholderTextColor="#d6d3d1"
						/>
					)}
				</View>
				<View className="mt-2">
					<MultipleSelectList
						setSelected={(val) => setSelectedTags(val)}
						data={streetArtTypes}
						label="Tags"
						save="value"
						placeholder="Select tags"
						badgeStyles={{ backgroundColor: "#c13584" }}
						arrowicon={
							<FontAwesome name="chevron-down" size={20} color={"#c13584"} />
						}
						searchicon={
							<FontAwesome name="search" size={20} color={"#c13584"} />
						}
						maxHeight={200}
						boxStyles={{ borderColor: "#d6d3d1" }}
						labelStyles={{ color: "#d6d3d1" }}
						defaultOption={"Graffiti"}
					/>
					<AppButton primary={true} title={"post"} icon={"mail"} />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default AddArt;
