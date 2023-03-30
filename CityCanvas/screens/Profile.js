import { Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from './EditProfile';
import ProfileInfo from './ProfileInfo';
const Stack = createNativeStackNavigator();

const Profile = ({ uid, navigation }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log('I am inside profile');
  useEffect(() => {
    setIsLoading(true);
    const userDoc = doc(db, 'users', uid);
    getDoc(userDoc).then((user) => {
      const userData = user.data();
      setUser(userData);
      setIsLoading(false);
    });
  }, [uid]);

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <SafeAreaView className="flex flex-1 bg-white">
      <Stack.Navigator>
        <Stack.Screen name="ProfileInfo">
          {(props) => <ProfileInfo {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default Profile;
