import { memo } from "react";
import { View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";
import {
  LoanInfoTitleText,
  LoanInfoValueText,
  RemainTurnBoxText,
} from "../../../../styles/TextStyledComponents";

interface LoanBoxProps {
  limitTurn: number;
  loanPrice: number;
}

function LoanBox({ limitTurn, loanPrice }: LoanBoxProps) {
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      <View style={{ alignItems: "flex-start" }}>
        {limitTurn >= 1 ? (
          limitTurn == 1 ? (
            <RemainTurnBoxText>내일</RemainTurnBoxText>
          ) : (
            <RemainTurnBoxText>D-{limitTurn}</RemainTurnBoxText>
          )
        ) : (
          <RemainTurnBoxText></RemainTurnBoxText>
        )}
      </View>
      <View style={{ marginTop: 1 }}>
        <LoanInfoTitleText>대출금</LoanInfoTitleText>
        <LoanInfoValueText>
          {loanPrice / 10000 >= 10000
            ? `${convertKrNumberType(Math.ceil(loanPrice / 100000000))}억원`
            : `${convertKrNumberType(Math.ceil(loanPrice / 10000))}만원`}
        </LoanInfoValueText>
      </View>
    </View>
  );
}

export default memo(LoanBox);
