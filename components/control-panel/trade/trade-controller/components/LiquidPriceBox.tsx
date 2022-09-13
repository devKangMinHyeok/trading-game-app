import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../../functions/convertKrNumberType";
import {
  ControlSectionTitleText,
  ControlSectionValueText,
  LiquidControlSectionValueText,
} from "../../../../../styles/TextStyledComponents";

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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ControlSectionTitleText>청산가 </ControlSectionTitleText>
      <LiquidControlSectionValueText isLong={isLongSelected}>
        {isLongSelected
          ? convertKrNumberType(Math.ceil(longLiquid))
          : convertKrNumberType(Math.ceil(shortLiquid))}
      </LiquidControlSectionValueText>
    </View>
  );
}

export default memo(LiquidPriceBox);
