import { StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./HomeScreen.styles";
import { INavigationProps } from "../../navigations/INavigationProps";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { LATITUDE_DELTA, LONGITUDE_DELTA, requestLocationPermission } from "./UseHomeScreen";
import Geolocation from "react-native-geolocation-service";

const HomeScreen: React.FC<INavigationProps> = ({ navigation, route }) => {

  const [permission, setPermission] = useState(false);
  const [myRegion, setMyRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    requestLocationPermission().then(e => {
      if (e) {
        Geolocation.getCurrentPosition(
          (position) => {
            setMyRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            console.log(position);
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <MapView
        style={styles.map}
        initialRegion={myRegion}
        region={myRegion}>
        <Marker
          coordinate={myRegion} />
      </MapView>
    </View>
  );
};

export default HomeScreen;
