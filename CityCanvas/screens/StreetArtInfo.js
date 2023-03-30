import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

const StreetArtInfo = () => {
	const [artInfo, setArtInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const docRef = doc(db, "art", "N5hqYaendejOZMP2WwM6");
		getDoc(docRef).then((data) => {
			setArtInfo(data.data());
		});
		setIsLoading(false);
	}, []);

	return (
		<SafeAreaView>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<Image className="w-32 h-32 m-2 rounded-3xl" src={artInfo.image} />
					<Text>{artInfo.title}</Text>
					<Text>{artInfo.artist}</Text>
					<Text>
						{artInfo.address_building_number} {artInfo.address_street},{" "}
						{artInfo.address_city} {artInfo.address_postcode}
					</Text>
					<Text>{artInfo.likes_count}</Text>
					<Text>{artInfo.date_created.toDate().toDateString()}</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default StreetArtInfo;
