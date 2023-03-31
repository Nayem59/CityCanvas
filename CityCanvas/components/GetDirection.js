import { Linking } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const GetDirection = (props) => {
  //   const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
  //   const URL = scheme + `${LatLng}`

  const mapUrl = Platform.select({
    ios: `maps://app?saddr=${props.from}&daddr=${props.to}`,
    // android: `${scheme}${latLng}(${label})`,
  });
  return (
    <EvilIcons
      name="external-link"
      size={28}
      color="#C13584"
      onPress={() => {
        Linking.canOpenURL(mapUrl).then((supported) => {
          if (supported) {
            Linking.openURL(mapUrl).catch((err) => {
              console.log(err);
            });
          } else {
            Linking.openURL(
              `https://www.google.com/maps/dir/${props.from}/${props.to}/`
            ).catch((err) => {
              console.log(err);
            });
          }
        });
      }}
    />
  );
};

export default GetDirection;
