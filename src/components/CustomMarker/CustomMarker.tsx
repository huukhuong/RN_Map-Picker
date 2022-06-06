import { Image, View } from "react-native";
import { Marker } from "react-native-maps";
import React from "react";
import { User } from "../../models/User";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../utils/Constants";
import styles from "./CustomMarker.styles";

interface props {
  user: User
}

const CustomMarker = (props: props) => {
  const user = props.user
  const coordinate = {
    latitude: user.lat,
    longitude: user.long,
    longitudeDelta: LONGITUDE_DELTA,
    latitudeDelta: LATITUDE_DELTA,
  };
  return (
    <Marker
      coordinate={coordinate}>
      <View style={styles.markerWrapper}>
        <View style={styles.markerBackground} />
        <View style={styles.markerArrow} />
        <Image
          style={styles.markerAvatar}
          source={{ uri: user.avatar }} />
      </View>
    </Marker>);
};

export default CustomMarker;
