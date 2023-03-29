import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import TimeAgo from "react-native-timeago";
import { serverTimestamp } from "firebase/firestore";
import ArtCard from "../components/ArtCard";
import { SafeAreaView } from "react-native-safe-area-context";

const StreetArtInfo = () => {
  const [artInfo, setArtInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const docRef = doc(db, "art", "N5hqYaendejOZMP2WwM6");
    getDoc(docRef).then((data) => {
      setArtInfo(data.data());
    });
    setIsLoading(false);
  }, []);

  const updated_at_timestamp = serverTimestamp();
  const time = docRef.update({ date_created: updated_at_timestamp });
  time.then((data) => {
    console.log(data);
  });

  return (
    <SafeAreaView>
      <Image className="h-32 w-32 rounded-3xl m-2" src={artInfo.image} />
      <Text>{artInfo.title}</Text>
      <Text>{artInfo.artist}</Text>
      <Text>
        {artInfo.address_building_number} {artInfo.address_street},{" "}
        {artInfo.address_city} {artInfo.address_postcode}
      </Text>
      <Text>{artInfo.likes_count}</Text>

      <TimeAgo date={artInfo.date_created.NoteDate.toDate()} />
    </SafeAreaView>
  );
};

export default StreetArtInfo;
