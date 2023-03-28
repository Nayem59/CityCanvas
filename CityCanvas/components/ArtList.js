// import { View, Text, FlatList } from "react-native";
// import React, { useState, useEffect } from 'react';
// import { db } from "../firebaseConfig";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { NavigationContainer } from "@react-navigation/native";
// import firestore from '@react-native-firebase/firestore';
// import { doc, onSnapshot } from "firebase/firestore"
// import { collection, doc, setDoc } from "firebase/firestore"; 
// import database from '@react-native-firebase/database';

// const [isLoading, setIsLoading] = useState(true)
// const artCol = collection(db, "art");
// const [art, setArt] = useState([]);

// console.log('oooooo');

// const ArtList = () => {
//     useEffect(() => {
//         setIsLoading(true)
//         function getArtWork() {
//           return getDocs(artCol)
//             .then((artworksSnapShot) => {
//               const artWorkList = artworksSnapShot.docs.map((doc) => doc.data());
//               console.log(data);
//               setArt(artWorkList);
//               setIsLoading(false)
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//         getArtWork();
//       }, []);
//       console.log(art);

//   return (
//     <NavigationContainer>
//       <SafeAreaView>
//         <View>
//           <Text>
//           <FlatList
//         data={myList}
//         renderItem={({ item }) => {
//           return <Text>{item.name}</Text>;
//         }}
//       />
//           </Text>
//         </View>
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// };

// export default ArtList;
