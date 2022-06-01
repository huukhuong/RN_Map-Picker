import { Dimensions, PermissionsAndroid, Platform } from "react-native";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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


export {
  screen,
  ASPECT_RATIO,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  requestLocationPermission,
};
