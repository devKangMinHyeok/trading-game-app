import { memo } from "react";
import { Text, View } from "react-native";

interface RemainTurnBoxProps {
  limitTurn: number;
  turnNumber: number;
}

function RemainTurnBox({ limitTurn, turnNumber }: RemainTurnBoxProps) {
  return (
    <View>
      <Text>상환까지 {limitTurn - turnNumber}일 남음</Text>
    </View>
  );
}

export default memo(RemainTurnBox);
