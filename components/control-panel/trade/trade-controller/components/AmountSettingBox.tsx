import Slider from "@react-native-community/slider";
import { memo } from "react";
import { Text, View } from "react-native";

interface AmountSettingBoxProps {
  amountRate: number;
  setAmountRate: (value: number) => void;
}

function AmountSettingBox({
  amountRate,
  setAmountRate,
}: AmountSettingBoxProps) {
  const amountRateHandler = (value: number) => {
    setAmountRate(value);
  };
  return (
    <View>
      <Text>보유 현금 대비 </Text>
      <Text>{amountRate}%</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={amountRate}
        onValueChange={amountRateHandler}
        tapToSeek={true}
      />
    </View>
  );
}

export default memo(AmountSettingBox);
