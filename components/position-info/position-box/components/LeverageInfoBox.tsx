import { memo } from "react";
import { Text, View } from "react-native";

interface LeverageInfoBoxProps {
  leverage: number;
}

function LeverageInfoBox({ leverage }: LeverageInfoBoxProps) {
  return (
    <View>
      <Text>레버리지 : x{leverage}</Text>
    </View>
  );
}

export default memo(LeverageInfoBox);
