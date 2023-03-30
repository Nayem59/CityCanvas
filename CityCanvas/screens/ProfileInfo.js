import { SafeAreaView, View, Text } from 'react-native';
import React from 'react';
import AppButton from '../components/AppButton';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ProfileInfo = ({ user, navigation }) => {
  const handleUserLogout = () => {
    signOut(auth).then(() => {});
  };

  return (
    <SafeAreaView className="w-full h-full">
      <View className="mt-10 w-10/12 mx-auto">
        <View>
          <Text className="font-bold text-black text-3xl pl-2">
            Hi <Text className="text-pink">{user.firstName}! 👋</Text>
          </Text>
        </View>
        <View className="my-10 rounded-3xl bg-white px-5 py-5">
          <Text className="font-bold text-xl pb-3">Profile Details:</Text>
          <Text className="pb-2 text-base">First name: {user.firstName}</Text>
          <Text className="pb-2 text-base">Last name: {user.lastName}</Text>
          <Text className="pb-2 text-base">Username: {user.username}</Text>
          <Text className="pb-1 text-base">Email: {user.email}</Text>
        </View>
        <AppButton
          title="Edit profile"
          primary
          icon="edit"
          handlePress={() => navigation.navigate('EditProfile')}
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
