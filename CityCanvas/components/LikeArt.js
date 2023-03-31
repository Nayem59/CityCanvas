import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";

const LikeArt = ({ itemId, item }) => {
	const [likes, setLikes] = useState(false);
	const incLikes = () => {
		const likesRef = doc(db, "art", itemId);
		updateDoc(likesRef, { likes_count: increment(1) });
		return likesRef;
	};

	return (
		<TouchableOpacity
			onPress={() => setLikes(!likes)}
			className="flex items-end justify-end p-1"
		>
			<Text>
				<AntDesign
					name="heart"
					size={20}
					color={likes ? "#ed1a25" : "#a8a29e"}
				/>{" "}
				<Text>{item.likes_count} </Text>
			</Text>
		</TouchableOpacity>
	);
};

export default LikeArt;
