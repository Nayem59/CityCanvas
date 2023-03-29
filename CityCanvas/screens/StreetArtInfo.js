import { View, Text, Image, Button, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const StreetArtInfo = ({ route, navigation }) => {
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
          <Image className="h-32 w-32 rounded-3xl m-2" src={artInfo.image} />
          <Text>{artInfo.title}</Text>
          <Text>{artInfo.artist}</Text>
          <Text>
            {artInfo.address_building_number} {artInfo.address_street},{" "}
            {artInfo.address_city} {artInfo.address_postcode}
          </Text>
          <Text>{artInfo.likes_count}</Text>
          <Text>{artInfo.date_created.toDate().toDateString()}</Text>

          <TouchableHighlight onPress={() => {}}>
            <View>
              <Button title="Get Location"></Button>
              <Entypo name="location-pin" size={24} color="black" />
            </View>
          </TouchableHighlight>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StreetArtInfo;
