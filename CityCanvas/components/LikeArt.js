import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";

const LikeArt = ({ itemId, item }) => {
  const [liked, setLiked] = useState(false);
  const [renderLikesCount, setRenderLikesCount] = useState(item.likes_count);

  const updateLikes = () => {
    liked ? decLikes() : incLikes();
  };

  const incLikes = () => {
    const likesRef = doc(db, "art", itemId);
    setRenderLikesCount((current) => current + 1)
    updateDoc(likesRef, { likes_count: increment(1) });
    setLiked(true);
    return likesRef;
  };
  const decLikes = () => {
    const unlikeRef = doc(db, "art", itemId);
    setRenderLikesCount((current) => current - 1)
    updateDoc(unlikeRef, { likes_count: increment(-1) });
    setLiked(false);
    return unlikeRef;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        updateLikes();
      }}
    >
      <Text className="absolute bottom-0 right-0 p-1 ">
        <AntDesign 
        name={ liked ? "heart" : "hearto"} size={20} color="#C13584" />{" "}
        <Text className="font-semibold">{renderLikesCount} </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default LikeArt;
