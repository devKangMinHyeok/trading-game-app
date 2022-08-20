import { ScrollView, Text, View } from "react-native";
import rootStyles from "../../styles/rootStyles";
import Shop from "./shop/Shop";
import Trade from "./trade/Trade";

function ControlPanel() {
  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={rootStyles.controlPanel}
    >
      <Trade />
      <Shop />
    </ScrollView>
  );
}

export default ControlPanel;
