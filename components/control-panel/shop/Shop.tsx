import { Text, View } from "react-native";
import rootStyles from "../../../styles/rootStyles";
import { BaseTextContainer } from "../../../styles/TextStyledComponents";

function Shop() {
  return (
    <View style={rootStyles.shop}>
      <BaseTextContainer>Shop</BaseTextContainer>
      <BaseTextContainer>(준비중)</BaseTextContainer>
    </View>
  );
}

export default Shop;
