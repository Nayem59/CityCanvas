import {
	View,
	Text,
	Image,
	TextInput,
	Alert,
	ActivityIndicator,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
	doc,
	setDoc,
	getDoc,
	getDocs,
	collection,
	query,
	orderBy,
} from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import * as yup from "yup";

let schema = yup.object().shape({
	comment: yup.string().min(2).required(),
});
const Comments = ({ route, uid, navigation }) => {
	const [allComments, setAllComments] = useState([]);
	const [text, setText] = useState("");
	const [commented, setCommented] = useState(false);
	const { image, id } = route.params;
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(true);
	const [userImage, setUserImage] = useState("");

	const condensedTime = (time) => {
		const firebaseTime = new Date(
			time.seconds * 1000 + time.nanoseconds / 1000000
		);
		// const hours = firebaseTime.toLocaleTimeString();
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		const date = firebaseTime.toLocaleString("en-gb", options);
		return `${date}`;
	};

	useEffect(() => {
		setLoading(true);
		const commentsRef = collection(db, "art", id, "Comments");
		const timeStampQuery = query(commentsRef, orderBy("timeCommented", "desc"));
		const userDocRef = doc(db, "users", uid);
		getDocs(timeStampQuery).then((commentsSnapShot) => {
			const commentsList = commentsSnapShot.docs.map((doc) => {
				const singleDoc = doc.data();
				return { ...singleDoc };
			});
			setAllComments(commentsList);
			setLoading(false);
		});
		getDoc(userDocRef).then((user) => {
			const userData = user.data();
			setUsername(userData.username);
			setUserImage(userData.profile_img);
			setLoading(false);
		});
	}, [commented]);

	const submitComment = () => {
		const commentRef = doc(db, "art", id, "Comments", uuid.v4());
		const commentObj = {
			Username: username,
			comment: text,
			timeCommented: new Date(),
		};
		schema
			.validate(commentObj)
			.then(() => {
				setDoc(commentRef, commentObj).then(() => {
					setText("");
					setCommented(!commented);
				});
			})
			.catch((err) => {
				const [message] = err.errors;
				Alert.alert(message);
			});
	};

	return (
		<View className="flex items-center justify-center bg-white">
			{loading ? (
				<View className="flex items-center justify-center flex-1">
					<ActivityIndicator size="large" color="#C13584" />
					<Text className="text-pink">loading</Text>
				</View>
			) : (
				<View className="flex items-center justify-center w-full h-full bg-white">
					<TouchableOpacity
						className="relative z-10 p-2 right-44"
						onPress={() => navigation.goBack()}
					>
						<Ionicons
							name="chevron-back-circle-outline"
							size={38}
							color="#C13584"
						/>
					</TouchableOpacity>
					<Image src={image} className="w-full h-60 " />
					<View className="flex flex-row items-center justify-center w-11/12 my-4 border rounded-3xl py-auto border-stone-300 focus:border-pink">
						<TextInput
							placeholder="add a comment..."
							autoCapitalize="none"
							multiline={true}
							value={text}
							onChangeText={(input) => setText(input)}
							className="m-2 w-72"
						/>
						<TouchableOpacity className="px-2 py-2 ">
							<FontAwesome
								name="paper-plane-o"
								size={24}
								color={"#c13584"}
								style={{ margin: "auto", padding: 8 }}
								onPress={submitComment}
							/>
						</TouchableOpacity>
					</View>
					<FlatList
						className="w-full"
						data={allComments}
						renderItem={({ item }) => {
							return (
								<View
									className={
										item.Username === username
											? "my-1 rounded-xl  px-7 py-2 w-11/12  mx-auto mt-2"
											: "my-1 rounded-xl border-pink px-7  py-2 w-11/12  mx-auto mt-2"
									}
									style={{
										shadowColor: "#000",
										backgroundColor: "#fff",
										shadowOffset: {
											height: 2,
										},
										shadowOpacity: 0.2,
										shadowRadius: 2,
									}}
								>
									<View className="flex flex-row items-center justify-start mb-2">
										{userImage && item.Username === username ? (
											<View className="flex items-center justify-center w-12 h-12 my-1 border rounded-full border-stone-200">
												<Image
													source={{
														uri: userImage,
														width: 100,
														height: 100,
													}}
													className="w-full h-full rounded-full"
												/>
											</View>
										) : (
											<FontAwesome
												name="user-circle"
												size={44}
												color="gray"
												style={{ marginRight: 1 }}
											/>
										)}

										<Text className="p-4 pl-1 text-gray-600">
											{item.Username}
										</Text>
									</View>

									<Text className="px-1 text-lg ">{item.comment}</Text>
									<View className="flex flex-row items-center justify-between">
										<Text className="text-pink">Reply</Text>
										<Text className="p-4 pl-1 text-right text-gray-600">
											{condensedTime(item.timeCommented)}
										</Text>
									</View>
								</View>
							);
						}}
					/>
				</View>
			)}
		</View>
	);
};

export default Comments;
