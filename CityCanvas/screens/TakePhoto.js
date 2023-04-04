import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";

export default function TakePhoto({ navigation, route }) {
  // const { setToggle } = route.params;
  let toggler;

  route.params ? (toggler = route.params.setToggle) : (toggler = null);
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
      navigation.navigate("AddArt");
      if (toggler) {
        toggler(true);
      }
    };

    return (
      <SafeAreaView className="flex flex-1 bg-black">
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View className="flex flex-row items-center justify-between mx-3 opacity-80">
          <TouchableOpacity
            onPress={sharePic}
            className="flex items-center justify-center p-7 gap-y-1"
          >
            <Feather name="share" size={24} color="#C13584" />
            <Text className="text-lg text-stone-500">Share</Text>
          </TouchableOpacity>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity
              onPress={savePhoto}
              className="flex items-center justify-center p-7 gap-y-1"
            >
              <Feather name="save" size={24} color="#C13584" />
              <Text className="text-lg text-center text-stone-500 ">Save</Text>
            </TouchableOpacity>
          ) : undefined}
          <TouchableOpacity
            onPress={() => setPhoto(undefined)}
            className="flex items-center justify-center p-7 gap-y-1"
          >
            <AntDesign name="close" size={24} color="#C13584" />
            <Text className="text-lg text-center text-stone-500 ">Discard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      {/* <View className="flex items-center justify-end w-full h-full mb-10"> */}
      {/* <TouchableOpacity
					onPress={takePic}
					className="items-end justify-center w-20 h-20 p-2 border border-2 rounded-full border-pink"
					activeOpacity={0.7}
					>
					<View className="w-full h-full border rounded-full bg-pink border-pink"></View>
					</TouchableOpacity>
				</View> */}
      <TouchableOpacity
        className="flex items-center justify-end w-full h-full mb-10"
        activeOpacity={0.7}
        onPress={takePic}
      >
        <Entypo name="picasa" size={80} color="#C13584" />
      </TouchableOpacity>
      <StatusBar style="dark" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
