import { memo } from "react";
import { Text, View } from "react-native";

interface RemainTurnBoxProps {
  limitTurn: number;
}

function RemainTurnBox({ limitTurn }: RemainTurnBoxProps) {
  return (
    <View>
      {limitTurn >= 1 ? (
        limitTurn == 1 ? (
          <Text>내일은 상환일</Text>
        ) : (
          <Text>상환까지 {limitTurn}일 남음</Text>
        )
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

export default memo(RemainTurnBox);
