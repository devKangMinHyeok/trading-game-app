import { View } from "react-native";
import rootStyles from "../styles/rootStyles";
import MiddleAccount from "./account/MiddleAccount";
import TopAccount from "./account/TopAccount";
import Chart from "./chart/Chart";
import PositionInfo from "./position-info/PositionInfo";
import ControlPanel from "./control-panel/ControlPanel";
import NextTurnButton from "./next-turn-button/NextTurnButton";

function Display() {
  return (
    <>
      <View style={rootStyles.display}>
        <TopAccount />
        <Chart />
        <MiddleAccount />
        <PositionInfo />
        <ControlPanel />
        <NextTurnButton />
      </View>
    </>
  );
}

export default Display;
