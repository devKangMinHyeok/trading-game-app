import { memo } from "react";
import { Text, View } from "react-native";

interface TurnNumberBoxProps {
  turnNumber: number;
}

function TurnNumberBox({ turnNumber }: TurnNumberBoxProps) {
  return (
    <View>
      <Text>{turnNumber}일째</Text>
    </View>
  );
}

export default memo(TurnNumberBox);
