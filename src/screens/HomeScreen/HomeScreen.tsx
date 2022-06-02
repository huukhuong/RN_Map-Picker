import { Dimensions, PermissionsAndroid, Platform, StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./HomeScreen.styles";
import { INavigationProps } from "../../navigations/INavigationProps";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const HomeScreen: React.FC<INavigationProps> = ({ navigation, route }) => {

  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [myRegion, setMyRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    requestLocationPermission().then(result => {
      if (result) {
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

  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === "ios") {
      return true;
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
      }
    }
    return false;
  };

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
