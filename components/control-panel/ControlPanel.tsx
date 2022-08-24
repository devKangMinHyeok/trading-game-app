import { ScrollView, Text, View } from "react-native";
import { useRecoilValue } from "recoil";

import rootStyles from "../../styles/rootStyles";
import Shop from "./shop/Shop";
import Trade from "./trade/Trade";

function ControlPanel() {
  return (
    <View style={rootStyles.controlPanel}>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Trade />
        <Shop />
      </ScrollView>
    </View>
  );
}

export default ControlPanel;
