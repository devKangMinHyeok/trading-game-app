import { memo } from "react";
import { View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";
import {
  LoanInfoValueText,
  InterestTurnLimitText,
  LoanInfoTitleText,
} from "../../../../styles/TextStyledComponents";

interface InterestBoxProps {
  remainTurn: number;
  interestPrice: number;
}

function InterestBox({ remainTurn, interestPrice }: InterestBoxProps) {
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <View style={{ alignItems: "flex-start" }}>
        {remainTurn == 1 ? (
          <InterestTurnLimitText>내일</InterestTurnLimitText>
        ) : (
          <InterestTurnLimitText>D-{remainTurn}</InterestTurnLimitText>
        )}
      </View>
      <View>
        <LoanInfoTitleText>이자</LoanInfoTitleText>
        <LoanInfoValueText>
          {convertKrNumberType(interestPrice)}원
        </LoanInfoValueText>
      </View>
    </View>
  );
}

export default memo(InterestBox);
