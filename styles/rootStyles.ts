import { Dimensions, StyleSheet } from "react-native";

export const { width: SCREEN_WIDTH } = Dimensions.get("window");

const rootStyles = StyleSheet.create({
  display: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topAccount: {
    flex: 0.4,
    justifyContent: "flex-end",
    backgroundColor: "#dbffe3",
  },

  chart: {
    flex: 1.5,
    justifyContent: "center",
  },

  middleAccount: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "orange",
  },

  positionInfo: {
    flex: 1.4,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "green",
  },

  controlPanel: {
    flex: 1.7,
    backgroundColor: "pink",
  },

  trade: {
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: "grey",
  },

  shop: {
    width: SCREEN_WIDTH * 0.95,
    justifyContent: "center",
    backgroundColor: "purple",
  },

  rootControlButton: {
    flex: 0.5,
    backgroundColor: "blue",
    flexDirection: "row",
  },
});

export default rootStyles;
