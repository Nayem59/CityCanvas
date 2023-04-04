import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import AppButton from "../components/AppButton";
import uuid from "react-native-uuid";

const Comments = ({ route, uid }) => {
  const [allComments, setAllComments] = useState([]);
  const [text, setText] = useState("");
  const [commented, setCommented] = useState(false);
  const { image, id } = route.params;
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const condensedTime = (time) => {
    const firebaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    const date = firebaseTime.toDateString().slice(4);
    const hours = firebaseTime.toLocaleTimeString();
    console.log(`${date} ${hours}`);
    return `${date} ${hours}`;
  };

  useEffect(() => {
    setLoading(true);
    const commentsRef = collection(db, "art", id, "Comments");
    const userDocRef = doc(db, "users", uid);
    getDocs(commentsRef).then((commentsSnapShot) => {
      console.log(commentsSnapShot, "<<<commentsSnapShot");
      const commentsList = commentsSnapShot.docs.map((doc) => {
        const singleDoc = doc.data();
        return { ...singleDoc };
      });
      setAllComments(commentsList);
      setLoading(false);
    });
    getDoc(userDocRef).then((user) => {
      const userData = user.data();
      setUsername(userData.username);
      setLoading(false);
    });
  }, [commented]);

  // console.log(allComments[0].timeCommented);

  const submitComment = () => {
    const commentRef = doc(db, "art", id, "Comments", uuid.v4());
    const commentObj = {
      Username: username,
      comment: text,
      timeCommented: new Date(),
    };
    setDoc(commentRef, commentObj).then(() => {
      console.log("commented successfully");
      setText("");
      setCommented(!commented);
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <View>
      <View className="px-2">
        <Image
          src={image}
          className="w-full h-60 rounded rounded-r-none rounded-3xl"
        />
        <View className="p-2">
          <TextInput
            className="border p-5"
            onChangeText={setText}
            value={text}
            placeholder="add a comment..."
            multiline={true}
          />
          <AppButton
            title="Comment"
            primary={true}
            handlePress={submitComment}
          />
        </View>
        <FlatList
          className="border h-1/2"
          data={allComments}
          renderItem={({ item }) => {
            return (
              <View className="border rounded-full px-7 my-1">
                <Text className="font-bold">{item.Username}</Text>
                <Text className="px-10">{item.comment}</Text>
                <Text className="text-right">
                  {/* {item.timeCommented} */}
                  {condensedTime(item.timeCommented)}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Comments;
