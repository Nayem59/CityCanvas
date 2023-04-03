import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const AppButton = ({ title, primary, handlePress, icon }) => {
  return (
    <>
      {primary ? (
        <TouchableOpacity
          className="flex flex-row items-center justify-center w-full p-3 py-4 my-2 rounded-full bg-pink border-stone-300 "
          onPress={handlePress}
        >
          <AntDesign name={icon} size={20} color="white" />
          <Text className="ml-4 font-bold text-white uppercase text-md">
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="flex flex-row items-center justify-center w-full p-3 py-4 my-2 border rounded-full border-pink"
          onPress={handlePress}
        >
          <AntDesign name={icon} size={20} color="#C13584" />
          <Text className="ml-2 text-center uppercase text-md">{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default AppButton;
