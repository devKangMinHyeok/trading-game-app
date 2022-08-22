import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const rootStyles = StyleSheet.create({
  display: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topAccount: {
    flex: 0.5,
    justifyContent: "flex-end",
    backgroundColor: "#dbffe3",
  },

  chart: {
    flex: 2,
    justifyContent: "center",
  },

  middleAccount: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "orange",
  },

  positionInfo: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "green",
  },

  controlPanel: {
    backgroundColor: "pink",
  },

  trade: {
    width: SCREEN_WIDTH * 0.95,
    justifyContent: "center",
    backgroundColor: "grey",
  },

  shop: {
    width: SCREEN_WIDTH * 0.95,
    justifyContent: "center",
    backgroundColor: "purple",
  },

  rootControlButton: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default rootStyles;
