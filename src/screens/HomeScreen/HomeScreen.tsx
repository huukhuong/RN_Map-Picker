import { Dimensions, Image, PermissionsAndroid, Platform, StatusBar, View } from "react-native";
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
        getCurrentPosition();
      }
    });
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setMyRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        watchPosition();
        console.log(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true },
    );
  };

  const watchPosition = () => {
    Geolocation.watchPosition(
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
      { enableHighAccuracy: true },
    );
  };

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
          coordinate={myRegion}>
          <View style={styles.markerWrapper}>
            <View style={styles.markerBackground} />
            <View style={styles.markerArrow} />
            <Image
              style={styles.markerAvatar}
              source={{ uri: "https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?k=20&m=1270067126&s=612x612&w=0&h=ZMo10u07vCX6EWJbVp27c7jnnXM2z-VXLd-4maGePqc=" }} />
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

export default HomeScreen;
