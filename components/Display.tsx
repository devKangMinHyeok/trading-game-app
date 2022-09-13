import { View } from "react-native";
import rootStyles from "../styles/rootStyles";
import MiddleAccount from "./account/MiddleAccount";
import TopAccount from "./account/TopAccount";
import Chart from "./chart/Chart";
import PositionInfo from "./position-info/PositionInfo";
import ControlPanel from "./control-panel/ControlPanel";
import RootControlButton from "./root-control-button/RootControlButton";
import LevelInfoBox from "./level/LevelInfoBox";

function Display() {
  return (
    <>
      <View style={rootStyles.display}>
        <TopAccount />
        <LevelInfoBox />
        <Chart />
        <MiddleAccount />
        <PositionInfo />
        <ControlPanel />
        <RootControlButton />
      </View>
    </>
  );
}

export default Display;
