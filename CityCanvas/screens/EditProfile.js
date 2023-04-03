import { View, Text, TextInput } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import { AntDesign } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

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

const EditProfile = ({ navigation, user, uid, setProfileChange }) => {
	const editUserProfile = (firstName, lastName) => {
		const docRef = doc(db, "users", uid);
		updateDoc(docRef, { firstName, lastName }).then(() => {
			setProfileChange(true);
		});
	};

	return (
		<View className="bg-white w-100 h-100">
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
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
					<View className="flex items-center justify-center w-10/12 mx-auto mb-10">
						<Text className="mt-10 mb-10 text-3xl text-center">
							<Text className="font-bold text-pink">Edit Detail</Text>
						</Text>
						<View className="w-full">
							<TextInput
								placeholder={user.firstName}
								value={values.firstName}
								onChangeText={handleChange("firstName")}
								onBlur={handleBlur("firstName")}
								autoCapitalize="none"
								autoCorrect={false}
								className="w-full p-3 py-4 my-2 border rounded-lg border-stone-300 focus:border-pink"
							/>
							{errors.firstName && touched.firstName && (
								<View className="flex flex-row justify-start ml-2 ">
									<AntDesign name="exclamationcircleo" size={20} color="red" />
									<Text className="ml-2 text-red-600">{errors.firstName}</Text>
								</View>
							)}
						</View>

						<View className="w-full">
							<TextInput
								placeholder={user.lastName}
								value={values.lastName}
								onChangeText={handleChange("lastName")}
								onBlur={handleBlur("lastName")}
								autoCapitalize="none"
								className="w-full p-3 py-4 my-2 border rounded-lg border-stone-300 focus:border-pink"
							/>
							{errors.lastName && touched.lastName && (
								<View className="flex flex-row justify-start ml-2 ">
									<AntDesign name="exclamationcircleo" size={20} color="red" />
									<Text className="ml-2 text-red-600">{errors.lastName}</Text>
								</View>
							)}
						</View>
						<AppButton
							handlePress={handleSubmit}
							title="Save Changes"
							primary={true}
							icon={"save"}
						/>
						<AppButton
							handlePress={() => navigation.goBack()}
							title="Back to profile"
							primary={false}
							icon={"arrowleft"}
						/>
					</View>
				)}
			</Formik>
		</View>
	);
};

export default EditProfile;
