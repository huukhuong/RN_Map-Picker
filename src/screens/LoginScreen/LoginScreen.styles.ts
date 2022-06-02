import { Dimensions, StyleSheet } from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  circle: {
    height: screen.width * 1.6,
    position: "absolute",
    left: -110,
    right: -110,
    borderBottomRightRadius: 900,
    borderBottomLeftRadius: 900,
  },
  circle1: {
    backgroundColor: "#F3F4F6",
    top: 50,
    zIndex: 0,
  },
  circle2: {
    backgroundColor: "#E9EBEE",
    top: 0,
    zIndex: 1,
  },
  bottomWrapper: {
    backgroundColor: "#101F41",
    paddingBottom: 80,
    paddingHorizontal: 140,
    top: -40,
    zIndex: 3,
    justifyContent: "flex-end",
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 48,
    textAlign: "center",
    marginBottom: 40,
  },
  formLabel: {
    color: "white",
    marginTop: 4,
  },
  formControl: {
    color: "white",
    backgroundColor: "#202E4E",
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  formMessage: {
    color: "red",
    marginTop: 2,
  },
  formButton: {
    marginTop: 20,
    backgroundColor: "#3155ED",
    textAlign: "center",
    color: "white",
    borderRadius: 100,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    height: 45
  },
  extractMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  message: {
    color: 'white'
  },
  extractMessageButton: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 4
  }
});

export default styles;
