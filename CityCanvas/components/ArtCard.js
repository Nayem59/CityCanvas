import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const ArtCard = ({ item }) => {
  return (
    <View className="border-2 flex-row mt-2 rounded-3xl border-light-gray">
      <View className="h-36 w-36">
        <Image className="h-32 w-32 rounded-3xl m-2" src={item.image} />
      </View>
      <View className="m-2 text-ellipsis w-48 font-sans">
        <Text className="color-pink font-bold text-base font-poppins">
          {item.title}
        </Text>
        <Text>Artist: {item.artist}</Text>
        <Text>
          Location: {item.address_building_number} {item.address_street},{" "}
          {item.address_city} {item.address_postcode}
        </Text>
        <Text>Likes: {item.likes_count}</Text>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   individualBox: {
//     box-sizing: border-box,
//     w : 128,
//     h : 23,
//     screenLeft: 166,
//     screenTop: 100,
//   }
// })
export default ArtCard;
