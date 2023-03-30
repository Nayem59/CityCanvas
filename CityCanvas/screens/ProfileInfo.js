import { SafeAreaView, View, Text } from 'react-native';
import React from 'react';
import AppButton from '../components/AppButton';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ProfileInfo = ({ user }) => {
  const handleUserLogout = () => {
    signOut(auth).then(() => {});
  };
  console.log('I am inside profile info');
  console.log(user, '<user in profile info');
  return (
    <SafeAreaView>
      <View>
        <Text>Hi {user.firstName}!</Text>
      </View>
      <View>
        <Text>Profile Details:</Text>
        <Text>First name: {user.firstName}</Text>
        <Text>Last name: {user.lastName}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
      </View>
      <AppButton
        title="Edit profile"
        primary
        icon="edit"
        handlePress={() => {}}
      />
      <AppButton
        title="Sign out"
        primary
        icon="logout"
        handlePress={handleUserLogout}
      />
    </SafeAreaView>
  );
};

export default ProfileInfo;
