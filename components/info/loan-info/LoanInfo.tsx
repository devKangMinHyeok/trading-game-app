import { View } from "react-native";
import { useRecoilValue } from "recoil";
import {
  interestPriceState,
  interestTurnNumberState,
  levelInfoState,
  loanTurnNumberState,
  turnNumberState,
} from "../../../atom";

import { INTEREST_RATE } from "../../../globalConstant";
import rootStyles from "../../../styles/rootStyles";
import InterestBox from "./components/InterestBox";
import LoanBox from "./components/LoanBox";

import TurnNumberBox from "./components/TurnNumberBox";

function LoanInfo() {
  const turnNumber = useRecoilValue(turnNumberState);
  const levelInfo = useRecoilValue(levelInfoState);
  const interestPrice = useRecoilValue(interestPriceState);
  const interestTurnNumber = useRecoilValue(interestTurnNumberState);
  const loanTurnNumber = useRecoilValue(loanTurnNumberState);

  return (
    <View style={rootStyles.loanInfo}>
      <View style={{ flex: 1 }}>
        <TurnNumberBox turnNumber={turnNumber} />
      </View>
      <View style={{ flex: 5 }}>
        <InterestBox
          remainTurn={interestTurnNumber}
          interestPrice={interestPrice}
        />
        <LoanBox limitTurn={loanTurnNumber} loanPrice={levelInfo.loan} />
      </View>
    </View>
  );
}

export default LoanInfo;
