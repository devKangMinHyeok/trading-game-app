import { memo } from "react";
import { Text, View } from "react-native";
import { EmptyPositionText } from "../../styles/TextStyledComponents";

function EmptyPositionBox() {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}
    >
      <EmptyPositionText>포지션이 없습니다.</EmptyPositionText>
    </View>
  );
}

export default memo(EmptyPositionBox);
