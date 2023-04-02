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
    setRenderLikesCount((current) => current + 1);
    setLikes(true);
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
          name={likes ? "heart" : "hearto"}
          size={20}
          color={likes ? "#C13584" : "#BDBABA"}
        />{" "}
        <Text className="font-semibold ">{renderLikesCount} </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default LikeArt;
