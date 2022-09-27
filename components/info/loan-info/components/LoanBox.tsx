import { memo } from "react";
import { View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";
import {
  LoanInfoTitleText,
  LoanInfoUnitText,
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LoanInfoValueText>
            {loanPrice / 10000 >= 10000
              ? `${convertKrNumberType(Math.ceil(loanPrice / 100000000))}`
              : `${convertKrNumberType(Math.ceil(loanPrice / 10000))}`}
          </LoanInfoValueText>
          <LoanInfoUnitText>
            {loanPrice / 10000 >= 10000 ? `억원` : `만원`}
          </LoanInfoUnitText>
        </View>
      </View>
    </View>
  );
}

export default memo(LoanBox);
