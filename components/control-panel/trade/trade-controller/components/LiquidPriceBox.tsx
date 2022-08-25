import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../../functions/convertKrNumberType";

interface LiquidPriceBoxProps {
  isLongSelected: boolean;
  longLiquid: number;
  shortLiquid: number;
}

function LiquidPriceBox({
  isLongSelected,
  longLiquid,
  shortLiquid,
}: LiquidPriceBoxProps) {
  return (
    <View>
      <Text>
        청산가 :{" "}
        {isLongSelected
          ? convertKrNumberType(Math.ceil(longLiquid))
          : convertKrNumberType(Math.ceil(shortLiquid))}
      </Text>
    </View>
  );
}

export default memo(LiquidPriceBox);
