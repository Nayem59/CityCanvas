import {
  View,
  Text,
  Image,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AppButton from "../components/AppButton";

const StreetArtInfo = ({
  route,
  navigation,
  title,
  primary,
  handlePress,
  icon,
}) => {
  const [artInfo, setArtInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;

  useEffect(() => {
    const testFunc = (id) => {
      console.log(id);
      setIsLoading(true);
      let docRef = doc(db, "art", id);
      return getDoc(docRef).then((data) => {
        console.log(data.data());
        setArtInfo(data.data());
        setIsLoading(false);
      });
    };
    testFunc(id);
  }, [id]);

  return (
    <SafeAreaView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <View className="flex flex-column items-center gap-1 p-1">
            <Image
              className="h-64 w-64 flex items-stretch rounded-3xl m-2 border-2"
              src={artInfo.image}
            />
          </View>
          <View className="mx-2 gap-1 p-2 border-2 border-light-gray rounded-3xl">
            <View className="flex flex-column items-center">
              <Text className="-mb-2 text-lg font-bold color-pink">
                {artInfo.title ? artInfo.title : "Untitled"}
              </Text>
              <Text className="mt-1 text-xs">
                By {artInfo.artist ? artInfo.artist : "Unknown"}
              </Text>
              <Text className="font-semibold color-md-gray brightness-50 text-xs mb-2">
                {artInfo.date_created.toDate().toDateString()}
              </Text>
            </View>
            <Text className="mb-2 text-justify">{artInfo.description}</Text>
            {/* <Text className="mb-2">{artInfo.likes_count}</Text> */}
            <Text className="mb-2">
              <Entypo name="location-pin" size={20} color="#C13584" />
              {artInfo.address_building_number} {artInfo.address_street},{" "}
              {artInfo.address_city} {artInfo.address_postcode}
            </Text>
          </View>
          {/* absolute -bottom-60 left-0 */}

          <View className="mt-24 mb-4 text-stone-500">
            <AppButton
              title={"Comments"}
              handlePress={() => {
                console.log("Comments Clicked");
              }}
              icon={"message1"}
            />
            <AppButton
              title={"Get Route"}
              handlePress={() => {
                console.log("Get Route Clicked");
              }}
              primary={true}
              icon={"user"}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StreetArtInfo;
