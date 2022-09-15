import { memo } from "react";
import { Text, View } from "react-native";
import { PositionLeverageBoxText } from "../../../../../styles/TextStyledComponents";

interface LeverageInfoBoxProps {
  leverage: number;
  isLong: boolean;
}

function LeverageInfoBox({ leverage, isLong }: LeverageInfoBoxProps) {
  return (
    <View>
      <PositionLeverageBoxText isLong={isLong}>
        X{leverage}
      </PositionLeverageBoxText>
    </View>
  );
}

export default memo(LeverageInfoBox);
