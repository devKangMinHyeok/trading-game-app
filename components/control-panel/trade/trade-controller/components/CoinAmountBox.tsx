import { memo } from "react";
import { View } from "react-native";
import convertKrNumberType from "../../../../../functions/convertKrNumberType";
import {
  ControlSectionTitleText,
  ControlSectionValueText,
} from "../../../../../styles/TextStyledComponents";

interface CoinAmountBoxProps {
  coinAmount: number;
}

function CoinAmountBox({ coinAmount }: CoinAmountBoxProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ControlSectionTitleText>개수 | </ControlSectionTitleText>
      <ControlSectionValueText>
        {convertKrNumberType(coinAmount)}
      </ControlSectionValueText>
    </View>
  );
}

export default memo(CoinAmountBox);
