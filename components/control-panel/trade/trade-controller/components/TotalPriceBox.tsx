import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../../functions/convertKrNumberType";
import {
  ControlSectionTitleText,
  ControlSectionValueText,
} from "../../../../../styles/TextStyledComponents";

interface TotalPriceBoxProps {
  totalPrice: number;
  coinAmount: number;
}

function TotalPriceBox({ totalPrice, coinAmount }: TotalPriceBoxProps) {
  return (
    <View style={{ flexDirection: "row", marginTop: 5 }}>
      <View style={{ flex: 1 }}>
        <ControlSectionTitleText>주문총액</ControlSectionTitleText>
        <ControlSectionValueText>
          {convertKrNumberType(Math.ceil(totalPrice))}원
        </ControlSectionValueText>
      </View>
      <View style={{ flex: 1 }}>
        <ControlSectionTitleText>개수</ControlSectionTitleText>
        <ControlSectionValueText>
          {convertKrNumberType(coinAmount)}
        </ControlSectionValueText>
      </View>
    </View>
  );
}

export default memo(TotalPriceBox);
