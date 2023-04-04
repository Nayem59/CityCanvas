import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Comments from "./Comments";

const StreetArtInfo = ({ route, navigation, locationBristol }) => {
  const [artInfo, setArtInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [newLocal, setNewLocal] = useState("");
  const { id } = route.params;
  const myLocation = `${locationBristol.latitude}, ${locationBristol.longitude}`;

  const mapUrl = Platform.select({
    ios: `maps://app?saddr=${myLocation}&daddr=${newLocal}`,
  });

  useEffect(() => {
    const testFunc = (id) => {
      setIsLoading(true);
      let docRef = doc(db, "art", id);
      return getDoc(docRef)
        .then((data) => {
          setArtInfo(data.data());
          setIsLoading(false);
          return data;
        })
        .then((data) => {
          const newLatLong = data.data().location_geopoint;
          setNewLocal(`${newLatLong.latitude},${newLatLong.longitude}`);
        });
    };
    testFunc(id);
  }, [id]);

  return (
    <SafeAreaView className="absolute w-full h-full bg-white">
      {isLoading ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#C13584" />
          <Text className="text-pink">loading</Text>
        </View>
      ) : (
        <View>
          <View className="flex items-center py-4 mb-2 h-max">
            <TouchableOpacity
              className="relative z-10 right-44"
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-circle-outline"
                size={38}
                color="#C13584"
              />
            </TouchableOpacity>
            <Image
              className="flex items-center w-full h-60"
              src={artInfo.image}
            />
          </View>
          <View className="flex w-10/12 mx-auto">
            <View>
              <View className="flex items-center flex-column">
                <Text className="mb-1 text-lg font-bold color-pink">
                  {artInfo.title ? artInfo.title : "Untitled"}
                </Text>
                <Text className="mt-1">
                  By {artInfo.artist ? artInfo.artist : "Unknown"}
                </Text>
                <Text className="mb-2 font-semibold text-stone-400">
                  {artInfo.date_created.toDate().toDateString()}
                </Text>
              </View>
              <ScrollView className="h-40 mb-2 overflow-scroll">
                <Text className="text-lg text-justify">
                  {artInfo.description}
                </Text>
              </ScrollView>

              <Text className="mb-1 text-stone-400">
                <Entypo name="location-pin" size={20} color="#C13584" />
                {artInfo.address_building_number} {artInfo.address_street},{" "}
                {artInfo.address_city} {artInfo.address_postcode}
              </Text>
            </View>

            <View className="mt-3 text-stone-500">
              <AppButton
                title={"Comments"}
                icon={"message1"}
                handlePress={() =>
                  navigation.navigate("Comments", {
                    image: artInfo.image,
                    id: id,
                  })
                }
              />
              <TouchableOpacity
                className="flex flex-row items-center justify-center w-full p-3 py-4 my-2 rounded-full bg-pink border-stone-300"
                onPress={() => {
                  Linking.canOpenURL(mapUrl).then((supported) => {
                    if (supported) {
                      Linking.openURL(mapUrl).catch((err) => {
                        console.log(err);
                      });
                    } else {
                      Linking.openURL(
                        `https://www.google.com/maps/dir/${myLocation}/${newLocal}/`
                      ).catch((err) => {
                        console.log(err);
                      });
                    }
                  });
                }}
              >
                <AntDesign name="enviromento" size={20} color="white" />
                <Text className="ml-4 font-bold text-white uppercase text-md">
                  GET DIRECTIONS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StreetArtInfo;
