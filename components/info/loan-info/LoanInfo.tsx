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
import InterestLimitBox from "./components/InterestLimitBox";
import InterestRateBox from "./components/InterestRateBox";
import RemainTurnBox from "./components/RemainTurnBox";
import TargetAssetBox from "./components/TargetAssetBox";
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
      <View style={{ flex: 1 }}>
        <InterestRateBox interestRate={INTEREST_RATE} />
        <InterestLimitBox
          remainTurn={interestTurnNumber}
          interestPrice={interestPrice}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <TargetAssetBox loan={levelInfo.loan} />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <RemainTurnBox limitTurn={loanTurnNumber} />
      </View>
    </View>
  );
}

export default LoanInfo;
