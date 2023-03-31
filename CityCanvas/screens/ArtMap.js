import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState } from "react";
import {
	SafeAreaView,
	Alert,
	View,
	Text,
	Image,
	ActivityIndicator,
} from "react-native";
import uuid from "react-native-uuid";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import * as Location from "expo-location";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const ArtMap = ({ objectProp }) => {
	const { renderComponent, setRenderComponent } = objectProp;
	const [isLoading, setIsLoading] = useState(true);

	const [artLocationList, setArtLocationList] = useState([]);
	const [selectedMarkerPoint, setSelectedMarkerPoint] = useState(null);

	const Bristol = {
		latitude: 51.454514,
		longitude: -2.5879,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};
	useEffect(() => {
		function getArtWork() {
			setIsLoading(true);
			const artCol = collection(db, "art");
			getDocs(artCol).then((snapshot) => {
				const artList = snapshot.docs.map((doc) => doc.data());
				setArtLocationList(artList);
				setIsLoading(false);
			});
		}
		getArtWork();
		const getPermissions = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Please grant location permissions");
				return;
			}
		};
		getPermissions();
	}, [renderComponent]);

	const markers = artLocationList.map((location) => {
		const { latitude, longitude } = location.location_geopoint;
		const { title, image, address_postcode, address_street, likes_count } =
			location;
		const id = uuid.v4();

		return (
			<Marker
				coordinate={{ latitude, longitude }}
				key={id}
				onPress={() => {
					setSelectedMarkerPoint(location.location_geopoint);
				}}
			>
				<FontAwesome
					name="map-marker"
					size={40}
					color={
						selectedMarkerPoint === location.location_geopoint
							? "#E5B5D0"
							: "#C13584"
					}
				/>
				<Callout className="w-64 h-64 p-0 rounded-xl">
					<View className="flex flex-col m-0 mb-2 w-44 h-2/3">
						<Text className="w-64 h-full mt-1 ">
							<Image
								source={{ uri: image }}
								resizeMode="cover"
								className="w-64 h-full mb-2 rounded-md"
							/>
						</Text>
						<View className="flex flex-col mt-1 gap-1-2">
							<Text className="w-full font-bold text-pink">
								{title ? title : "Untitled"}
							</Text>
							<View className="flex flex-row items-center gap-1 p-1">
								<AntDesign name="heart" size={20} color="gray" />
								<Text className="w-full">{likes_count}</Text>
							</View>
							<View className="flex flex-row items-center justify-between gap-1 px-2 w-52">
								<FontAwesome name="map-marker" size={22} color="gray" />
								<Text className="w-full">
									{address_postcode}, {address_street}
								</Text>
								<EvilIcons name="external-link" size={28} color="#C13584" />
							</View>
						</View>
					</View>
				</Callout>
			</Marker>
		);
	});

	return (
		<SafeAreaView className="flex flex-1">
			{isLoading ? (
				<View className="flex items-center justify-center flex-1">
					<ActivityIndicator size="large" color="#C13584" />
					<Text className="text-pink">loading</Text>
				</View>
			) : (
				<MapView
					className="flex flex-1"
					initialRegion={Bristol}
					zoomEnabled={true}
					// provider={PROVIDER_GOOGLE}
					showsUserLocation={true}
				>
					{markers}
				</MapView>
			)}
		</SafeAreaView>
	);
};

export default ArtMap;
