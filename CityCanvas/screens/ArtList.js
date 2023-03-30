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

const ArtList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const artCol = collection(db, "art");
  const [art, setArt] = useState([]);

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
  }, []);


  return (
    <SafeAreaView>
      {isLoading ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#C13584" />
          <Text className="text-pink">loading</Text>
        </View>
      ) : (
        <View>
          <Button
            onPress={() => {
              navigation.navigate("StreetArtInfo", { navigation });
            }}
            title="click me"
          />

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
      <Text>ArtList</Text>
    </SafeAreaView>
  );
};

export default ArtList;
