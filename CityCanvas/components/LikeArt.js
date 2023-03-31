import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";

const LikeArt = ({ itemId, item }) => {
  const [likes, setLikes] = useState(false);
  const [renderLikesCount, setRenderLikesCount] = useState(item.likes_count);

  const updateLikes = () => {
    likes ? decLikes() : incLikes();
  };

  const toggle = () => {
    updateLikes();
    setLikes(!likes);
  };

  const incLikes = () => {
    const likesRef = doc(db, "art", itemId);
    updateDoc(likesRef, { likes_count: increment(1) });
    return likesRef;
  };

  const decLikes = () => {
    const unlikeRef = doc(db, "art", itemId);
    setRenderLikesCount((current) => current - 1);
    updateDoc(unlikeRef, { likes_count: increment(-1) });
    setLikes(false);
    return unlikeRef;
  };

  return (
    <TouchableOpacity
      onPress={() => toggle()}
      className="flex items-end justify-end p-1"
    >
      <Text>
        <AntDesign
          name={liked ? "heart" : "hearto"}
          size={20}
          color="#C13584"
        />{" "}
        <Text className="font-semibold">{renderLikesCount} </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default LikeArt;
