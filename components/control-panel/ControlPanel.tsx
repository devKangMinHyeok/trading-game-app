import { ScrollView, View } from "react-native";

import rootStyles from "../../styles/rootStyles";
import Shop from "./shop/Shop";
import Trade from "./trade/Trade";

function ControlPanel() {
  return (
    <View style={rootStyles.controlPanel}>
      <Shop />
      <Trade />
    </View>
  );
}

export default ControlPanel;
