import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ArtCard from "../components/ArtCard";
import LikeArt from "../components/LikeArt";

const ArtList = ({ navigation, objectProp }) => {
  const [isLoading, setIsLoading] = useState(true);
  const artCol = collection(db, "art");
  const [art, setArt] = useState([]);
  const { renderComponent } = objectProp;

  useEffect(() => {
    setIsLoading(true);
    function getArtWork() {
      return getDocs(artCol)
        .then((artworksSnapShot) => {
          const artWorkList = artworksSnapShot.docs.map((doc) => {
            const id = doc.id;
            const singleDoc = doc.data();
            return { ...singleDoc, id };
          });

          setArt(artWorkList);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getArtWork();
  }, [renderComponent]);

  return (
    <SafeAreaView className="bg-white ">
      {isLoading ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#C13584" />
          <Text className="text-pink">loading</Text>
        </View>
      ) : (
        <View className="w-11/12 mx-auto bg-white">
          <FlatList
            data={art}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("StreetArtInfo", {
                      id: item.id,
                    });
                  }}
                >
                  <ArtCard item={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ArtList;
