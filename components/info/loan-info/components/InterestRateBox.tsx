import { memo } from "react";
import { Text, View } from "react-native";

interface InterestRateBoxProps {
  interestRate: number;
}

function InterestRateBox({ interestRate }: InterestRateBoxProps) {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text>이자율 </Text>
      <Text>{interestRate * 100}%</Text>
    </View>
  );
}

export default memo(InterestRateBox);
