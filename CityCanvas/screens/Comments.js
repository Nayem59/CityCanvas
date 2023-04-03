import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

const Comments = ({ route }) => {
  const [allComments, setAllComments] = useState([]);
  const { image } = route.params;

  useEffect(() => {
    const commentRef = collection(
      db,
      "art",
      "5yLZ71JCQDx3LnlnBDwC",
      "Comments"
    );
    getDocs(commentRef).then((commentsSnapShot) => {
      const commentsList = commentsSnapShot.docs.map((doc) => {
        const singleDoc = doc.data();
        return { ...singleDoc };
      });
      setAllComments(commentsList);
    });
  }, []);

  return (
    <View>
      <Text>Comments</Text>
      <View>
        <Image
          src={image}
          className="w-full h-full rounded rounded-r-none rounded-l-3xl"
        />
      </View>
    </View>
  );
};

export default Comments;
