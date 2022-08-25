import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";

interface ProfitInfoBoxProps {
  unrealizedPnl: number;
  profitRate: number;
}

function ProfitInfoBox({ unrealizedPnl, profitRate }: ProfitInfoBoxProps) {
  return (
    <View>
      <Text>
        미실현 손익 : {convertKrNumberType(Math.ceil(unrealizedPnl))}원{" "}
        {(profitRate * 100).toFixed(2)}%
      </Text>
    </View>
  );
}

export default memo(ProfitInfoBox);
