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
    backgroundColor: theme.colors.backgroundColor2,
  },

  controlPanel: {
    flex: 1.7,
    backgroundColor: "pink",
    flexDirection: "row",
  },

  trade: {
    flex: 7.5,
    backgroundColor: "grey",
  },

  shop: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundColor1,
  },

  rootControlButton: {
    flex: 0.5,
    backgroundColor: "blue",
    flexDirection: "row",
  },
});

export default rootStyles;
