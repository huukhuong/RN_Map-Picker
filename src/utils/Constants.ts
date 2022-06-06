import { Dimensions } from "react-native";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
};
