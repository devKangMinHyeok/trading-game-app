import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const rootStyles = StyleSheet.create({
  display: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topAccount: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#dbffe3",
  },

  chart: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#afffc1",
  },

  middleAccount: {
    flex: 1,
    justifyContent: "center",
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

  nextTurnButton: {
    flex: 0.5,
    backgroundColor: "blue",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default rootStyles;
