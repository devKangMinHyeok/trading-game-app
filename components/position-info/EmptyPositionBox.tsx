import { memo } from "react";
import { Text, View } from "react-native";

function EmptyPositionBox() {
  return (
    <View>
      <Text>포지션이 없습니다.</Text>
    </View>
  );
}

export default memo(EmptyPositionBox);
