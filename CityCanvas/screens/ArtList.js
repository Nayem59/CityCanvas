import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";

const ArtList = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>ArtList</Text>
      <Button
        onPress={() => {
          navigation.navigate("StreetArtInfo");
        }}
        title="click me"
      />
    </SafeAreaView>
  );
};

export default ArtList;
