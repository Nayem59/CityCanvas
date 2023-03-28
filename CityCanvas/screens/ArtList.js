import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, setDoc, onSnapshot } from "firebase/firestore";
import ArtCard from "../components/ArtCard";

const ArtList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const artCol = collection(db, "art");
  const [art, setArt] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    function getArtWork() {
      return getDocs(artCol)
        .then((artworksSnapShot) => {
          const artWorkList = artworksSnapShot.docs.map((doc) => doc.data());
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
      <View>
        <Text>
          <FlatList
            data={art}
            renderItem={({ item }) => {
              return <ArtCard item={item}/>
            }}
          />
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ArtList;
