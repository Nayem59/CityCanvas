import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

const AddArt = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [userLocation, setUserLocation] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getPermissionsAndLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Please grant location permissions");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    const reversedLocation = await Location.reverseGeocodeAsync({
      longitude: currentLocation.coords.longitude,
      latitude: currentLocation.coords.latitude,
    });
    const { city, postalCode } = reversedLocation[0];
    const location = `${city}, ${postalCode}`;
    setUserLocation(location);
  };

  const [date, setDate] = useState(new Date());

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
  };

  const streetArtTypes = [
    { key: "1", value: "Graffiti" },
    { key: "2", value: "Stencil Art" },
    { key: "3", value: "Mural Art" },
    { key: "4", value: "Sticker Art" },
    { key: "5", value: "Yarn Bombing" },
    { key: "6", value: "Paste Up Art" },
    { key: "7", value: "Installation Art" },
    { key: "8", value: "Reverse Graffiti" },
  ];

  return (
    <SafeAreaView className="items-center w-full h-full bg-white">
      <Text className="mt-10 mb-10 text-3xl text-center">
        Upload <Text className="font-bold text-pink">Street Art</Text>
      </Text>
      <View className="w-10/12">
        <View className="w-full">
          <View className="flex flex-row items-center justify-between w-full p-3 py-4 my-2 border rounded-lg border-stone-300 focus:border-pink">
            <TextInput
              placeholder={"Upload image"}
              autoCapitalize="none"
              value={image}
              onChange={(input) => setImage(input)}
            />
            <TouchableOpacity className="px-2 border-l border-stone-300">
              <FontAwesome
                name="upload"
                size={20}
                color={"#c13584"}
                style={{ marginLeft: 10 }}
                onPress={pickImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full">
          <TextInput
            placeholder="Title"
            autoCapitalize="none"
            className="w-full p-3 py-4 my-2 border rounded-lg border-stone-300 focus:border-pink"
          />
        </View>
        <View className="w-full">
          <TextInput
            placeholder="Description"
            autoCapitalize="none"
            className="w-full p-3 pb-32 my-2 border rounded-lg border-stone-300 focus:border-pink"
          />
        </View>
        <View className="w-full ">
          <View className="flex flex-row items-center justify-between w-full p-3 py-4 my-2 border rounded-lg border-stone-300 focus:border-pink">
            <TextInput
              placeholder="Location"
              autoCapitalize="none"
              value={userLocation}
              onChange={(input) => setUserLocation(input)}
            />
            <TouchableOpacity
              className="px-2 border-l border-stone-300"
              onPress={getPermissionsAndLocation}
            >
              <FontAwesome
                name="location-arrow"
                size={20}
                color={"#c13584"}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row justify-between w-full p-3 py-2 my-2 border rounded-lg border-stone-300 focus:border-pink">
          <Text className="mt-2 text-stone-300">Date</Text>
          <DateTimePicker
            mode="date"
            value={date}
            textColor="black"
            accentColor={"#c13584"}
            onChange={onChange}
            placeholderTextColor="#d6d3d1"
          />
        </View>
        <View className="mt-2">
          <MultipleSelectList
            setSelected={(val) => setSelectedTags(val)}
            data={streetArtTypes}
            label="Tags"
            save="value"
            placeholder="Select tags"
            badgeStyles={{ backgroundColor: "#c13584" }}
            arrowicon={
              <FontAwesome name="chevron-down" size={20} color={"#c13584"} />
            }
            searchicon={
              <FontAwesome name="search" size={20} color={"#c13584"} />
            }
            maxHeight={150}
            boxStyles={{ borderColor: "#d6d3d1" }}
            labelStyles={{ color: "#d6d3d1" }}
            defaultOption={"Graffiti"}
          />
        </View>
        <View className="flex items-end justify-end h-32">
          <TouchableOpacity className="flex flex-row items-center justify-center w-full p-3 py-4 my-2 rounded-lg bg-pink border-stone-300">
            <AntDesign name={"mail"} size={20} color="white" />
            <Text className="ml-4 font-bold text-white uppercase text-md">
              POST
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddArt;
