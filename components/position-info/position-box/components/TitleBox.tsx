import { memo } from "react";
import { Text, View } from "react-native";

interface TitleBoxProps {
  isLong: boolean;
}

function TitleBox({ isLong }: TitleBoxProps) {
  return (
    <View>
      <Text>{isLong ? "Long" : "Short"}</Text>
    </View>
  );
}

export default memo(TitleBox);
