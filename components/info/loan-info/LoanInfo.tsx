import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cashAccountState,
  interestPriceState,
  isCandleMovingState,
  levelInfoState,
  levelNumberState,
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

  const [cashAccount, setCashAccount] = useRecoilState(cashAccountState);
  const [longAccount, setLongAccount] = useRecoilState(longAccountState);
  const [shortAccount, setShortAccount] = useRecoilState(shortAccountState);

  const [futureActive, setFutureActive] = useState<number>(0); // 0: nothing, 1: Long, 2: Short
  const [curLeverage, setCurLeverage] = useState<number>(1);
  const [interestTurnNumber, setInterestTurnNumber] = useState(
    INTEREST_DUE_PERIOD - (turnNumber % INTEREST_DUE_PERIOD)
  );
  const [progressRate, setProgressRate] = useState<number>(
    totalAccount.totalAsset / levelInfo.loan
  );

  const payInterest = () => {
    if (cashAccount >= interestPrice) {
      setCashAccount((cash) => cash - interestPrice);
    } else if (
      totalFutureAccount.totalAsset -
        interestPrice *
          (1 + (levelInfo.transactionFeeRate * curLeverage) / 100) >=
      0
    ) {
      if (futureActive == 1) {
        setLongAccount((prev) => {
          const newAccount = cloneDeep(prev);
          const newAmount =
            newAccount.openPositionAmount -
            interestPrice / newAccount.openPrice;
          const newValue =
            newAccount.openPositionValue -
            interestPrice *
              (1 + (levelInfo.transactionFeeRate * curLeverage) / 100);
          newAccount.openPositionAmount = newAmount;
          newAccount.openPositionValue = newValue;
          return newAccount;
        });
      } else if (futureActive == 2) {
        setShortAccount((prev) => {
          const newAccount = cloneDeep(prev);
          const newAmount =
            newAccount.openPositionAmount -
            interestPrice / newAccount.openPrice;
          const newValue =
            newAccount.openPositionValue -
            interestPrice *
              (1 + (levelInfo.transactionFeeRate * curLeverage) / 100);
          newAccount.openPositionAmount = newAmount;
          newAccount.openPositionValue = newValue;
          return newAccount;
        });
      }
    } else {
      alert(
        "이자를 내지 못하여 파산하셨습니다.\n 리셋 버튼을 눌러 처음부터 다시 시작하세요."
      );
    }
  };

  useEffect(() => {
    setInterestTurnNumber(
      INTEREST_DUE_PERIOD - (turnNumber % INTEREST_DUE_PERIOD)
    );
  }, [turnNumber]);

  useEffect(() => {
    if (longAccountDetail.positionActive) {
      setFutureActive(1);
      setCurLeverage(longAccountDetail.leverage);
    } else if (shortAccountDetail.positionActive) {
      setFutureActive(2);
      setCurLeverage(shortAccountDetail.leverage);
    } else {
      setFutureActive(0);
    }
  }, [longAccountDetail, shortAccountDetail]);

  useEffect(() => {
    if (!isCandleMoving) {
      setProgressRate(totalAccount.totalAsset / levelInfo.loan);
    }
  }, [isCandleMoving, levelNumber, turnNumber]);

  useEffect(() => {
    if (interestTurnNumber % INTEREST_DUE_PERIOD == 0) payInterest();
  }, [interestTurnNumber]);

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
        <RemainTurnBox
          limitTurn={levelInfo.limitTurn}
          turnNumber={turnNumber}
        />
      </View>
    </View>
  );
}

export default LoanInfo;
