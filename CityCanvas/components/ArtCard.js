import { View, Text, Image } from "react-native";
import React from "react";

const ArtCard = ({ item }) => {
  console.log(item);
  return (
    <View>
      <Text>{item.title}</Text>

      <Text>{item.artist}</Text>
      <Image
        style={{
          height: 150,
          width: 150,
          borderRadius: 20,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        src={item.image}
      />
      <Text>
        {item.address_building_number} {item.address_street},{" "}
        {item.address_city} {item.address_postcode}
      </Text>
      <Text>{item.likes_count}</Text>
    </View>
  );
};

export default ArtCard;
