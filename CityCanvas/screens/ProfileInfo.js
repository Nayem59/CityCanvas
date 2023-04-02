import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import AppButton from "../components/AppButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ProfileInfo = ({ user, navigation }) => {
  const handleUserLogout = () => {
    signOut(auth).then(() => {});
  };

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="w-10/12 mx-auto mt-10">
        <View>
          <Text className="pl-2 text-3xl font-bold text-black">
            Hi <Text className="text-pink">{user.firstName}! 👋</Text>
          </Text>
        </View>
        <View className="px-5 py-5 my-10 bg-white rounded-3xl">
          <Text className="pb-3 text-xl font-bold">Profile Details:</Text>
          <Text className="pb-2 text-base">First name: {user.firstName}</Text>
          <Text className="pb-2 text-base">Last name: {user.lastName}</Text>
          <Text className="pb-2 text-base">Username: {user.username}</Text>
          <Text className="pb-1 text-base">Email: {user.email}</Text>
        </View>
        <AppButton
          title="Edit Details"
          primary
          icon="edit"
          handlePress={() => navigation.navigate("EditProfile")}
        />
        <AppButton
          title="Sign out"
          icon="logout"
          handlePress={handleUserLogout}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileInfo;
