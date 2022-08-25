import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";

interface OpenPositionInfoProps {
  openPositionValue: number;
}

function OpenPositionInfo({ openPositionValue }: OpenPositionInfoProps) {
  return (
    <View>
      <Text>
        진입 포지션 가치 : {convertKrNumberType(Math.ceil(openPositionValue))}원
      </Text>
    </View>
  );
}

export default memo(OpenPositionInfo);
