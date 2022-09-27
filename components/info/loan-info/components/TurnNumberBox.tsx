import { memo } from "react";
import { View } from "react-native";
import { DayNumberText } from "../../../../styles/TextStyledComponents";

interface TurnNumberBoxProps {
  turnNumber: number;
}

function TurnNumberBox({ turnNumber }: TurnNumberBoxProps) {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <DayNumberText>{turnNumber}일째</DayNumberText>
    </View>
  );
}

export default memo(TurnNumberBox);
