import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { View } from "react-native";

const LikeArt = ({ artInfo, route, navigation }) => {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  //   const { id } = route.params;

  useEffect(() => {
    const addLikes = () => {
      console.log("1111111");
      setIsLoading(true);
      let docRef = doc(db, "art");
      return getDoc(docRef).then((data) => {
        setIsLoading(false);
      });
    };
    addLikes();
  }, []);

  return (
    <SafeAreaView>
      <View>{artInfo.likes_count}</View>
    </SafeAreaView>
  );
};

export default LikeArt;
