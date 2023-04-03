import {
	Text,
	SafeAreaView,
	View,
	ActivityIndicator,
	TextInput,
	Image,
	TouchableOpacity,
	Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Modal from "react-native-modal";

const EditProfileSchema = Yup.object({
	firstName: Yup.string()
		.min(2, "Too short")
		.max(20, "Too long")
		.required("Required"),
	lastName: Yup.string()
		.min(2, "Too short")
		.max(30, "Too long")
		.required("Required"),
});

const Profile = ({ uid, navigation }) => {
	const [user, setUser] = useState({});
	const [profileChange, setProfileChange] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [savedChanged, setSavedChanges] = useState(false);

	const styles = isEditable
		? "w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink"
		: "w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink bg-stone-200 ";

	const handleUserLogout = () => {
		signOut(auth).then(() => {});
	};

	const toggleEditable = () => {
		setIsEditable(!isEditable);
	};

	const editUserProfile = (firstName, lastName) => {
		const docRef = doc(db, "users", uid);
		updateDoc(docRef, { firstName, lastName }).then(() => {
			setProfileChange(true);
		});
	};
	useEffect(() => {
		setIsLoading(true);
		const userDoc = doc(db, "users", uid);
		getDoc(userDoc).then((user) => {
			const userData = user.data();
			setUser(userData);
			setProfileChange(false);
			setIsLoading(false);
		});
	}, [uid, profileChange]);

	return (
		<SafeAreaView className="flex flex-1 bg-white">
			<Modal
				isVisible={savedChanged}
				animationType="slide"
				animationInTiming={300}
			>
				<View className="flex items-center justify-center">
					<View className="flex items-center justify-between h-48 p-4 bg-white w-60 gap-y-2 rounded-2xl">
						<Text className="w-full text-xl text-center text-stone-400">
							Changes saved Successfully!
						</Text>
						<AntDesign name="checkcircle" size={50} color="#1DB954" />
						<Pressable
							onPress={() => {
								setSavedChanges(false);
							}}
							className="w-full border-t border-stone-200"
						>
							<Text className="mt-2 text-lg font-bold text-center">
								Back to Profile
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			{isLoading ? (
				<View className="flex items-center justify-center flex-1">
					<ActivityIndicator size="large" color="#C13584" />
					<Text className="text-pink">loading</Text>
				</View>
			) : (
				<View className="flex w-full h-full bg-white">
					<Formik
						initialValues={{
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
							username: user.username,
						}}
						validationSchema={EditProfileSchema}
						onSubmit={({ firstName, lastName }) => {
							editUserProfile(firstName, lastName);
						}}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
							touched,
						}) => (
							<View className="flex items-center justify-center w-10/12 mx-auto my-5 mb-10">
								<Text className="pl-2 text-3xl font-bold text-black">
									Hi <Text className="text-pink">{user.firstName}! 👋</Text>
								</Text>
								{/* <EvilIcons name="user" size={200} color="#d3d3d3" /> */}
								<View className="flex items-center justify-center my-4 border rounded-full w-52 h-52 border-pink">
									<Image
										source={{ uri: user.profile_img, width: 100, height: 100 }}
										className="w-full h-full rounded-full"
									/>
								</View>

								<View className="w-full">
									<TextInput
										placeholder={user.firstName}
										value={values.firstName}
										onChangeText={handleChange("firstName")}
										onBlur={handleBlur("firstName")}
										className={styles}
										editable={isEditable}
									/>
									{errors.firstName && touched.firstName && (
										<View className="flex flex-row justify-start ml-2 ">
											<AntDesign
												name="exclamationcircleo"
												size={20}
												color="red"
											/>
											<Text className="ml-2 text-red-600">
												{errors.firstName}
											</Text>
										</View>
									)}
								</View>

								<View className="w-full">
									<TextInput
										placeholder={user.lastName}
										value={values.lastName}
										onChangeText={handleChange("lastName")}
										onBlur={handleBlur("lastName")}
										className={styles}
										editable={isEditable}
									/>
									{errors.lastName && touched.lastName && (
										<View className="flex flex-row justify-start ml-2 ">
											<AntDesign
												name="exclamationcircleo"
												size={20}
												color="red"
											/>
											<Text className="ml-2 text-red-600">
												{errors.lastName}
											</Text>
										</View>
									)}
								</View>
								<View className="w-full">
									<TextInput
										placeholder={user.email}
										value={values.email}
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
										className="w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink bg-stone-200 "
										editable={false}
									/>
									{errors.email && touched.email && (
										<View className="flex flex-row justify-start ml-2 ">
											<AntDesign
												name="exclamationcircleo"
												size={20}
												color="red"
											/>
											<Text className="ml-2 text-red-600">{errors.email}</Text>
										</View>
									)}
								</View>
								<View className="w-full">
									<TextInput
										placeholder={user.username}
										value={values.username}
										onChangeText={handleChange("username")}
										onBlur={handleBlur("username")}
										className="w-full p-3 py-4 my-2 border rounded-full border-stone-300 focus:border-pink bg-stone-200 "
										editable={false}
									/>
									{errors.username && touched.username && (
										<View className="flex flex-row justify-start ml-2 ">
											<AntDesign
												name="exclamationcircleo"
												size={20}
												color="red"
											/>
											<Text className="ml-2 text-red-600">
												{errors.username}
											</Text>
										</View>
									)}
								</View>
								{isEditable ? (
									<TouchableOpacity
										className="flex flex-row items-center justify-center w-full p-3 py-4 my-2 bg-green-400 rounded-full border-stone-300 "
										onPress={() => {
											handleSubmit();
											setSavedChanges(true);
											setIsEditable(false);
										}}
									>
										<AntDesign name={"save"} size={20} color="white" />
										<Text className="ml-4 font-bold text-white uppercase text-md">
											Save Changes
										</Text>
									</TouchableOpacity>
								) : (
									<AppButton
										handlePress={toggleEditable}
										title="Edit details"
										primary={true}
										icon={"edit"}
									/>
								)}

								<AppButton
									handlePress={handleUserLogout}
									title="Log out "
									primary={false}
									icon={"logout"}
								/>
							</View>
						)}
					</Formik>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Profile;
