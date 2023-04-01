import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Alert,
	Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import { doc, setDoc, GeoPoint, getDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { db } from "../firebaseConfig";
import uuid from "react-native-uuid";
import Modal from "react-native-modal";

const AddArt = ({ navigation, setRenderComponent, renderComponent, uid }) => {
	const [username, setUserName] = useState("");
	const [image, setImage] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState({});
	const [date, setDate] = useState(new Date());
	const [tags, setTags] = useState([]);
	const [artist, setArtist] = useState("");
	const [rerender, setRerender] = useState(false);

	const [isModalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		const docRef = doc(db, "users", uid);
		getDoc(docRef).then((data) => {
			const user = data.data().username;
			setUserName(user);
		});
		getPermissionsAndLocation();
	}, [rerender, uid]);

	const handleSubmit = () => {
		const object = {
			image,
			title,
			description,
			date_created: date,
			tags,
			...location,
			likes_count: 0,
			artist,
			username,
		};
		const docRef = doc(db, "art", uuid.v4());
		setDoc(docRef, object).then(() => {
			setImage("");
			setTitle("");
			setDescription("");
			setLocation({});
			setDate(new Date());
			setArtist("");
			setTags([]);
			setRerender(!rerender);
			setModalVisible(true);
			setRenderComponent(!renderComponent);
		});
	};
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const getPermissionsAndLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Please grant location permissions");
			return;
		}
		const currentLocation = await Location.getCurrentPositionAsync({});
		const reversedLocation = await Location.reverseGeocodeAsync({
			longitude: currentLocation.coords.longitude,
			latitude: currentLocation.coords.latitude,
		});
		const { city, postalCode, streetNumber, street } = reversedLocation[0];

		const locationData = {
			address_city: city,
			address_postcode: postalCode,
			address_building_number: streetNumber,
			address_street: street,
			location_geopoint: new GeoPoint(
				currentLocation.coords.latitude,
				currentLocation.coords.longitude
			),
		};
		setLocation(locationData);
	};

	const onChange = ({ type }, selectedDate) => {
		if (type == "set") {
			const currentDate = selectedDate;
			setDate(currentDate);
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

	return (
		<SafeAreaView className="items-center w-full h-full bg-white">
			<Modal
				isVisible={isModalVisible}
				animationType="slide"
				animationInTiming={300}
			>
				<View className="flex items-center justify-center">
					<View className="flex items-center justify-between h-48 p-4 bg-white w-60 gap-y-2 rounded-2xl">
						<Text className="w-full text-xl text-center text-stone-400">
							Posted Successfully!
						</Text>
						<AntDesign name="checkcircle" size={50} color="#1DB954" />
						<Pressable
							onPress={() => {
								navigation.navigate("Home");
								setModalVisible(false);
							}}
							className="w-full border-t border-stone-200"
						>
							<Text className="mt-2 text-lg font-bold text-center">
								Back to Home
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Text className="mt-10 mb-10 text-3xl text-center">
				Upload <Text className="font-bold text-pink">Street Art</Text>
			</Text>

			<View className="w-10/12">
				<View className="w-full">
					<View className="flex flex-row items-center justify-between w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink">
						<TextInput
							placeholder="Upload image"
							autoCapitalize="none"
							value={image}
							onChangeText={(input) => setImage(input)}
						/>
						<TouchableOpacity className="px-2 border-l border-stone-300">
							<FontAwesome
								name="upload"
								size={20}
								color={"#c13584"}
								style={{ marginLeft: 10 }}
								onPress={pickImage}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View className="w-full">
					<TextInput
						value={title}
						placeholder="Title"
						autoCapitalize="none"
						className="w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink"
						onChangeText={(input) => setTitle(input)}
					/>
				</View>
				<View className="w-full">
					<TextInput
						value={artist}
						placeholder="Artist"
						autoCapitalize="none"
						className="w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink"
						onChangeText={(input) => {
							input ? input : "unknown";
							setArtist(input);
						}}
					/>
				</View>
				<View className="w-full">
					<TextInput
						placeholder="Description"
						autoCapitalize="none"
						className="w-full p-5 pb-20 my-2 border rounded-3xl border-stone-300 focus:border-pink"
						value={description}
						onChangeText={(input) => setDescription(input)}
						maxLength={200}
					/>
				</View>
				<View className="w-full ">
					<View className="flex flex-row items-center justify-between w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink">
						<TextInput
							placeholder="Location"
							autoCapitalize="none"
							value={`${location.address_city} ${location.address_postcode}`}
							onChangeText={(input) => setLocation(input)}
						/>
						<TouchableOpacity
							className="px-2 border-l border-stone-300"
							onPress={getPermissionsAndLocation}
						>
							<FontAwesome
								name="location-arrow"
								size={20}
								color={"#c13584"}
								style={{ marginLeft: 10 }}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<View className="flex flex-row justify-between w-full p-3 py-2 my-2 border rounded-full border-stone-300 focus:border-pink">
					<Text className="mt-2 text-stone-300">Date</Text>
					<DateTimePicker
						mode="date"
						value={date}
						textColor="black"
						accentColor={"#c13584"}
						onChangeText={() => onChange()}
						placeholderTextColor="#d6d3d1"
					/>
				</View>
				<View className="mt-2">
					<MultipleSelectList
						setSelected={(input) => setTags(input)}
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
						maxHeight={150}
						boxStyles={{
							borderColor: "#d6d3d1",
							borderRadius: "999",
							paddingVertical: 16,
						}}
						labelStyles={{ color: "#d6d3d1" }}
						defaultOption={{ key: "1", value: "Graffiti" }}
					/>
				</View>
				<View className="flex items-end justify-end h-20">
					<TouchableOpacity
						className="flex flex-row items-center justify-center w-full p-3 py-4 my-2 rounded-full bg-pink border-stone-300"
						onPress={handleSubmit}
					>
						<AntDesign name={"mail"} size={20} color="white" />
						<Text className="ml-4 font-bold text-white uppercase text-md">
							POST
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default AddArt;
