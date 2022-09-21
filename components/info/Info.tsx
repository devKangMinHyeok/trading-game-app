import { ScrollView, View } from "react-native";
import rootStyles from "../../styles/rootStyles";
import LoanInfo from "./loan-info/LoanInfo";
import PositionInfo from "./position-info/PositionInfo";

function Info() {
  return (
    <View style={rootStyles.Info}>
      <ScrollView
        horizontal={true}
        alwaysBounceHorizontal={false}
        bounces={false}
      >
        <PositionInfo />
        <LoanInfo />
      </ScrollView>
    </View>
  );
}

export default Info;
