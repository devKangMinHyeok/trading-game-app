import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../functions/convertKrNumberType";

interface TotalPriceBoxProps {
  totalPrice: number;
  coinAmount: number;
}

function TotalPriceBox({ totalPrice, coinAmount }: TotalPriceBoxProps) {
  return (
    <View>
      <Text>
        주문총액 : {convertKrNumberType(Math.ceil(totalPrice))}원 | 개수 :{" "}
        {coinAmount}
      </Text>
    </View>
  );
}

export default memo(TotalPriceBox);
