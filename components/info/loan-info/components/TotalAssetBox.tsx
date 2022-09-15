import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";

interface TotalAssetBoxProps {
  totalAsset: number;
}

function TotalAssetBox({ totalAsset }: TotalAssetBoxProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text>총 보유 자산</Text>
      <Text>{convertKrNumberType(Math.ceil(totalAsset))}원</Text>
    </View>
  );
}

export default memo(TotalAssetBox);
