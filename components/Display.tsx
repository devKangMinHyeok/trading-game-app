import { View } from "react-native";
import TopAccount from "./account/TopAccount";
import Chart from "./chart/Chart";
import PositionInfo from "./position-info/PositionInfo";
import Shop from "./shop/Shop";
import Trade from "./trade/Trade";

function Display() {
  return (
    <>
      <View>
        <Chart />
        <TopAccount />
        <Trade />
        <PositionInfo />
        <Shop />
      </View>
    </>
  );
}

export default Display;
