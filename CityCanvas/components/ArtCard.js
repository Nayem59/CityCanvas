import { View, Text, Image, StyleSheet, Button, LogBox } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import LikeArt from "./LikeArt";

const ArtCard = ({ item, route }) => {
	return (
		<View
			className="flex-row mx-auto my-2 border w-96 rounded-3xl border-stone-100"
			style={{
				shadowColor: "#000",
				backgroundColor: "white",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.2,
				shadowRadius: 2,
			}}
		>
			<View className="h-40 w-36">
				<Image
					className="w-full h-full rounded rounded-r-none rounded-l-3xl"
					src={item.image}
				/>
			</View>

			<View className="m-2 font-sans w-52 text-ellipsis">
				<View className="h-5">
					<Text className="text-base font-bold color-pink">
						{item.title ? item.title : "Untitled"}
					</Text>
				</View>
				<View>
					<Text className="mt-1 text-stone-500">
						By {item.artist ? item.artist : "Unknown"}
					</Text>
				</View>
				<View></View>

				<View>
					<Text className="h-10 my-2 overflow-auto">
						<Ionicons name="location-sharp" size={18} color="#a8a29e" />
						{item.address_building_number} {item.address_street},{" "}
						{item.address_city}
					</Text>
				</View>
				<View className="flex items-end justify-end w-full mt-4">
					<LikeArt itemId={item.id} item={item} />
				</View>
			</View>
		</View>
	);
};

export default ArtCard;
