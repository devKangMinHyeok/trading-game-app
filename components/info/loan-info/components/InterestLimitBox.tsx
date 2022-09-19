import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";

interface InterestLimitBoxProps {
  remainTurn: number;
  interestPrice: number;
}

function InterestLimitBox({
  remainTurn,
  interestPrice,
}: InterestLimitBoxProps) {
  return (
    <View style={{ flex: 2, flexDirection: "row" }}>
      {remainTurn == 1 ? <Text>내일 </Text> : <Text>{remainTurn}일 뒤 </Text>}
      <Text>{convertKrNumberType(interestPrice)}원 지출</Text>
    </View>
  );
}

export default memo(InterestLimitBox);
