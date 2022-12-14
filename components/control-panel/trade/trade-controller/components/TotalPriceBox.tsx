import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../../functions/convertKrNumberType";
import {
  ControlSectionTitleText,
  ControlSectionValueText,
} from "../../../../../styles/TextStyledComponents";

interface TotalPriceBoxProps {
  totalPrice: number;
}

function TotalPriceBox({ totalPrice }: TotalPriceBoxProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ControlSectionTitleText>주문총액 | </ControlSectionTitleText>
      <ControlSectionValueText>
        {convertKrNumberType(Math.ceil(totalPrice))}원
      </ControlSectionValueText>
    </View>
  );
}

export default memo(TotalPriceBox);
