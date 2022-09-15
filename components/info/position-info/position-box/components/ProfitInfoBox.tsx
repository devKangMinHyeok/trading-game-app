import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../../functions/convertKrNumberType";
import {
  UnrealizedPnlBoxText,
  UnrealizedPnlBoxValue,
} from "../../../../../styles/TextStyledComponents";

interface ProfitInfoBoxProps {
  unrealizedPnl: number;
  profitRate: number;
  isPositive: string;
}

function ProfitInfoBox({
  unrealizedPnl,
  profitRate,
  isPositive,
}: ProfitInfoBoxProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1.3 }}>
        <UnrealizedPnlBoxText>미실현 손익</UnrealizedPnlBoxText>
        <UnrealizedPnlBoxValue isPositive={isPositive}>
          {convertKrNumberType(Math.ceil(unrealizedPnl))}원{" "}
        </UnrealizedPnlBoxValue>
      </View>
      <View style={{ flex: 1 }}>
        <UnrealizedPnlBoxText>수익률</UnrealizedPnlBoxText>
        <UnrealizedPnlBoxValue isPositive={isPositive}>
          {(profitRate * 100).toFixed(2)}%
        </UnrealizedPnlBoxValue>
      </View>
    </View>
  );
}

export default memo(ProfitInfoBox);
