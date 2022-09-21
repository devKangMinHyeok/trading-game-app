import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  bangTriggerState,
  cashAccountState,
  interestPriceState,
  interestTurnNumberState,
  isCandleMovingState,
  levelInfoState,
  levelNumberState,
  loanTurnNumberState,
  longAccountDetailState,
  longAccountState,
  shortAccountDetailState,
  shortAccountState,
  totalAccountState,
  totalFutureAccountState,
  turnNumberState,
} from "../../../atom";

import { INTEREST_DUE_PERIOD, INTEREST_RATE } from "../../../globalConstant";
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
  const interestPrice = useRecoilValue(interestPriceState);
  const longAccountDetail = useRecoilValue(longAccountDetailState);
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  const totalFutureAccount = useRecoilValue(totalFutureAccountState);

  const [bangTrigger, setBangTrigger] = useRecoilState(bangTriggerState);
  const [cashAccount, setCashAccount] = useRecoilState(cashAccountState);
  const [longAccount, setLongAccount] = useRecoilState(longAccountState);
  const [shortAccount, setShortAccount] = useRecoilState(shortAccountState);

  const interestTurnNumber = useRecoilValue(interestTurnNumberState);
  const loanTurnNumber = useRecoilValue(loanTurnNumberState);
  const [progressRate, setProgressRate] = useState<number>(
    totalAccount.totalAsset / levelInfo.loan
  );

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
        <RemainTurnBox limitTurn={loanTurnNumber} />
      </View>
    </View>
  );
}

export default LoanInfo;
