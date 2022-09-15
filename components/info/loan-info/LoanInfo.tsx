import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import {
  isCandleMovingState,
  levelInfoState,
  levelNumberState,
  totalAccountState,
  turnNumberState,
} from "../../../atom";
import convertKrNumberType from "../../../functions/convertKrNumberType";
import { INTEREST_RATE } from "../../../globalConstant";
import rootStyles from "../../../styles/rootStyles";
import InterestLimitBox from "./components/InterestLimitBox";
import InterestRateBox from "./components/InterestRateBox";
import LoanProgressBar from "./components/LoanProgressBar";
import RemainTurnBox from "./components/RemainTurnBox";
import TargetAssetBox from "./components/TargetAssetBox";
import TotalAssetBox from "./components/TotalAssetBox";
import TurnNumberBox from "./components/TurnNumberBox";

function LoanInfo() {
  const isCandleMoving = useRecoilValue(isCandleMovingState);
  const turnNumber = useRecoilValue(turnNumberState);
  const levelNumber = useRecoilValue(levelNumberState);
  const levelInfo = useRecoilValue(levelInfoState);
  const totalAccount = useRecoilValue(totalAccountState);
  const [progressRate, setProgressRate] = useState<number>(
    totalAccount.totalAsset / levelInfo.loan
  );

  const payInterest = () => {};

  useEffect(() => {
    if (!isCandleMoving) {
      setProgressRate(totalAccount.totalAsset / levelInfo.loan);
    }
  }, [isCandleMoving, levelNumber, turnNumber]);

  return (
    <View style={rootStyles.loanInfo}>
      <View style={{ flex: 1 }}>
        <TurnNumberBox turnNumber={turnNumber} />
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <InterestRateBox interestRate={INTEREST_RATE} />
        <InterestLimitBox
          remainTurn={10 - (turnNumber % 10)}
          loan={levelInfo.loan}
          interestRate={INTEREST_RATE}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <TotalAssetBox totalAsset={totalAccount.totalAsset} />
        <TargetAssetBox loan={levelInfo.loan} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LoanProgressBar progressRate={progressRate} />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <RemainTurnBox
          limitTurn={levelInfo.limitTurn}
          turnNumber={turnNumber}
        />
      </View>
    </View>
  );
}

export default LoanInfo;
