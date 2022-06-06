import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  markerWrapper: {
    width: 80,
    height: 80,
    alignItems: "center",
  },
  markerBackground: {
    marginTop: 2,
    width: 63,
    height: 65,
    backgroundColor: "#000",
    borderRadius: 24,
  },
  markerAvatar: {
    position: "absolute",
    marginTop: 10,
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 14,
    resizeMode: "center",
  },
  markerArrow: {
    position: "absolute",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#000",
    transform: [{ rotate: "180deg" }],
    marginTop: 40,
  },
});

export default styles;
