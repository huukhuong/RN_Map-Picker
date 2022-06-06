import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btnGPS: {
    position: "absolute",
    width: 50,
    height: 50,
    right: 25,
    bottom: 30,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOpacity: 1,
    elevation: 6,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 13 },
  },
});

export default styles;
