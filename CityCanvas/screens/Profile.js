import { Text, SafeAreaView, View, ActivityIndicator } from "react-native";
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

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      {isLoading ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#C13584" />
          <Text className="text-pink">loading</Text>
        </View>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
            cardStyle: {
              backgroundColor: "white",
            },
          }}
        >
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
      )}
    </SafeAreaView>
  );
};

export default Profile;
