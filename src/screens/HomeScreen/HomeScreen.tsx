import { Dimensions, Image, PermissionsAndroid, Platform, StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./HomeScreen.styles";
import { INavigationProps } from "../../navigations/INavigationProps";
import MapView from "react-native-maps";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import database from "@react-native-firebase/database";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../utils/Constants";
import { User } from "../../models/User";
import CustomMarker from "../../components/CustomMarker/CustomMarker";
import auth from "@react-native-firebase/auth";

const HomeScreen: React.FC<INavigationProps> = ({ navigation, route }) => {

  const reference = database().ref("/users");

  const [users, setUsers] = useState<User[]>([]);
  const [myRegion, setMyRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  function getUserIndex(list: any) {
    let index = -1;
    list.map((user: User, i: number) => {
      if (user.email === auth().currentUser?.email) {
        index = i;
      }
    });
    return index;
  }

  useEffect(() => {
    requestLocationPermission().then(result => {
      if (result) {
        getCurrentPosition();

        // add realtime listener database
        reference
          .on("value", snapshot => {
            const list = snapshot.val();
            setUsers(list);
            getUserIndex(list);
          });
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
        updateLocationOnDatabase(position);
        watchPosition();
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
        updateLocationOnDatabase(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true },
    );
  };


  const updateLocationOnDatabase = (position: GeoPosition) => {
    // update current location on realtime database
    const userIndex = getUserIndex(users);
    if (userIndex > -1) {
      console.log(`Update user [${userIndex}]`);
      let tempList: User[] = [...users];
      let currentUser: User = { ...users[userIndex] as User };
      currentUser.lat = position.coords.latitude;
      currentUser.long = position.coords.longitude;
      tempList[userIndex] = currentUser;
      setUsers(tempList);

      database()
        .ref("/users/" + userIndex)
        .set(currentUser)
        .then(() => console.log("Data updated"))
        .catch(e => console.log(e));
    }
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
        {
          users.map((user: User, index: number) => {
            return <CustomMarker
              key={index}
              user={user} />;
          })
        }
      </MapView>
    </View>
  );
};

export default HomeScreen;
