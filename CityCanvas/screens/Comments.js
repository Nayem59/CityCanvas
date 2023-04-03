import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  Timestamp,
} from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

const Comments = ({ route }) => {
  const [allComments, setAllComments] = useState([]);
  const { image } = route.params;
  const condensedTime = (time) => {
    const firebaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    const date = firebaseTime.toDateString().slice(4);
    const hours = firebaseTime.toLocaleTimeString();
    
   return `${date} ${hours}`;

    // const timeProblem = time.toDateString()
    // const date = new Date(timeProblem)
    // const year = date.getFullYear()
    // const month = date.getMonth()
    // const day = date.getDate()
    // const hours = date.getHours()
    // const minutes = date.getMinutes()
    // return `${day}/${month}/${year} ${hours}:${minutes}`
    // return date.toDateString()
  };

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
      <View className="px-2">
        <Image
          src={image}
          className="w-full h-60 rounded rounded-r-none rounded-3xl"
        />
        <FlatList
          data={allComments}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.Username}</Text>
                <Text>{item.comment}</Text>
                <Text>{condensedTime(item.timeCommented)}</Text>
                {/* <Text>{item.timeCommented.toDate().toTimeString().slice(0,5)} </Text>
                <Text>{item.timeCommented.toDate().toLocaleString()} I WANT THIS: 02/04/2023</Text> */}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Comments;
