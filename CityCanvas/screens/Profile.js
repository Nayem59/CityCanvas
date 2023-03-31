import { Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditProfile from "./EditProfile";
import ProfileInfo from "./ProfileInfo";
const Stack = createNativeStackNavigator();

const Profile = ({ uid, navigation }) => {
  const [user, setUser] = useState({});
  const [profileChange, setProfileChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <SafeAreaView className="flex flex-1 bg-white">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileInfo">
          {(props) => <ProfileInfo {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="EditProfile">
          {(props) => (
            <EditProfile
              {...props}
              user={user}
              uid={uid}
              setProfileChange={setProfileChange}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default Profile;
