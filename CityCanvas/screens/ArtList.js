// import { View, Text, SafeAreaView } from "react-native";
// import React from "react";

// const ArtList = () => {
// 	return (
// 		<SafeAreaView>
// 			<Text>ArtList</Text>
// 		</SafeAreaView>
// 	);
// };

// export default ArtList;

import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, setDoc, onSnapshot } from "firebase/firestore";

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
  console.log(art);

  return (
    <SafeAreaView>
      <View>
        <Text>
          <FlatList
            data={artCol}
            renderItem={({ item }) => {
              return <Text>{item.name}</Text>;
            }}
          />
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ArtList;
