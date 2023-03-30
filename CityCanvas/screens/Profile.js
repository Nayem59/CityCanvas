import { Text, SafeAreaView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppButton from '../components/AppButton';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Profile = ({ uid, navigation }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const userDoc = doc(db, 'users', uid);
    getDoc(userDoc).then((user) => {
      const userData = user.data();
      setUser(userData);
      setIsLoading(false);
    });
  }, [uid]);

  const handleUserLogout = () => {
    signOut(auth).then(() => {});
  };

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
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

export default Profile;
