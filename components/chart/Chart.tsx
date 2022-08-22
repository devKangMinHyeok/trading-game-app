import { Text, View } from "react-native";

import rootStyles from "../../styles/rootStyles";
import CandleChart from "./CandleChart";

function Chart() {
  return (
    <View style={rootStyles.chart}>
      <CandleChart />
    </View>
  );
}

export default Chart;
