import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";

interface TargetAssetBoxProps {
  loan: number;
}

function TargetAssetBox({ loan }: TargetAssetBoxProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text>대출금</Text>
      <Text>{convertKrNumberType(loan)}원</Text>
    </View>
  );
}

export default memo(TargetAssetBox);
