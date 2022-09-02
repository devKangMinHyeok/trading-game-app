import { Dimensions, StyleSheet } from "react-native";
import theme from "./theme";

export const { width: SCREEN_WIDTH } = Dimensions.get("window");

const rootStyles = StyleSheet.create({
  display: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topAccount: {
    flexDirection: "row",
    flex: 0.5,
    gap: 5,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: theme.colors.backgroundColor1,
  },

  chart: {
    flex: 1.6,
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.colors.backgroundColor1,
  },

  middleAccount: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundColor2,
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
