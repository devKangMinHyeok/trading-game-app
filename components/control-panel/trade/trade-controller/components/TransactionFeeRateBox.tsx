import { memo } from "react";
import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { levelInfoState } from "../../../../../atom";
import {
  ControlSectionTitleText,
  ControlSectionValueText,
} from "../../../../../styles/TextStyledComponents";

interface TransactionFeeRateBoxProps {
  transactionFee: number;
}

function TransactionFeeRateBox({ transactionFee }: TransactionFeeRateBoxProps) {
  const levelInfo = useRecoilValue(levelInfoState);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ControlSectionTitleText>수수료율 </ControlSectionTitleText>
      <ControlSectionValueText style={{ color: levelInfo.color }}>
        {transactionFee}%
      </ControlSectionValueText>
    </View>
  );
}

export default memo(TransactionFeeRateBox);
