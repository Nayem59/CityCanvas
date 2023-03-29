import { View, Text, Image, StyleSheet, Button, LogBox } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebaseConfig";

const ArtCard = ({ item }) => {
  return (
    <View className="border-2 flex-row mt-2 ml-2 rounded-3xl border-light-gray">
      <View className="h-36 w-36">
        <Image className="h-32 w-32 rounded-3xl m-2" src={item.image} />
      </View>

      <View className="m-2 text-ellipsis w-48 font-sans">
        <Text className="color-pink font-bold text-base">
          {item.title ? item.title : "Untitled"}
        </Text>

        <Text className="mt-1">
          <Text className="font-semibold">Artist: </Text>
          {item.artist ? item.artist : "Unknown"}
        </Text>

        <Text className="mt-1">
          <Ionicons name="location-sharp" size={18} color="black" />
          {item.address_building_number} {item.address_street},{" "}
          {item.address_city} {item.address_postcode}
        </Text>

        <Text className="self-end mt-5 mr-2">
          <AntDesign name="heart" size={20} color="#C13584" />{" "}
          {item.likes_count}
        </Text>

        <Button
          onPress={() => {
            db.collection("art")
              .where("address_building_number", "==", "1-3")
              .where("address_city", "==", "Bristol")
              .get()
              .then((querySnapshot) => {
                console.log(doc.id); // This is the ID of the document
                console.log(doc.data()); // This is the data of the document
                console.log(querySnapshot);
              });
          }}
          title="Press Me"
        />
      </View>
    </View>
  );
};

export default ArtCard;
