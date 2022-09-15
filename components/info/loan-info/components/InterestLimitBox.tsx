import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";

interface InterestLimitBoxProps {
  remainTurn: number;
  loan: number;
  interestRate: number;
}

function InterestLimitBox({
  remainTurn,
  loan,
  interestRate,
}: InterestLimitBoxProps) {
  return (
    <View style={{ flex: 2, flexDirection: "row" }}>
      <Text>{remainTurn}일 뒤 </Text>
      <Text>{convertKrNumberType(loan * interestRate)}원 지출</Text>
    </View>
  );
}

export default memo(InterestLimitBox);
