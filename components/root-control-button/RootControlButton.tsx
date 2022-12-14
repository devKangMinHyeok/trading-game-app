import { cloneDeep } from "lodash";
import { useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  cashAccountState,
  futureActiveState,
  interestPriceState,
  interestTurnNumberState,
  isCandleMovingState,
  levelInfoState,
  levelNumberState,
  loanInfoState,
  loanTurnNumberState,
  longAccountState,
  shortAccountState,
  turnNumberState,
} from "../../atom";
import {
  AccountResetButtonContainer,
  NextTurnButtonContainer,
} from "../../styles/buttonStyles";
import rootStyles from "../../styles/rootStyles";
import {
  NextTurnButtonText,
  ResetButtonText,
} from "../../styles/TextStyledComponents";
import ResetModal from "./ResetModal";

function RootControlButton() {
  const interestTurnNumber = useRecoilValue(interestTurnNumberState);
  const loanTurnNumber = useRecoilValue(loanTurnNumberState);
  const interestPrice = useRecoilValue(interestPriceState);
  const futureActive = useRecoilValue(futureActiveState);
  const loanInfo = useRecoilValue(loanInfoState);

  const [levelNumber, setLevelNumber] = useRecoilState(levelNumberState);
  const [longAccount, setLongAccount] = useRecoilState(longAccountState);
  const [shortAccount, setShortAccount] = useRecoilState(shortAccountState);
  const [turnNumber, setTurnNumber] = useRecoilState(turnNumberState);
  const [cashAccount, setCashAccount] = useRecoilState(cashAccountState);

  const resetCashAccount = useResetRecoilState(cashAccountState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const resetShortAccount = useResetRecoilState(shortAccountState);
  const resetLevelNumber = useResetRecoilState(levelNumberState);
  const resetTurnNumber = useResetRecoilState(turnNumberState);
  const [isCandleMoving, setIsCandleMoving] =
    useRecoilState(isCandleMovingState);

  const [isModalVisible, setModalVisible] = useState(false);

  const payInterest = () => {
    if (loanInfo.interest.cashAble) {
      setCashAccount(loanInfo.interest.cashRemain);
    } else if (loanInfo.interest.futureAble) {
      if (futureActive.isLongActive) {
        setLongAccount((prev) => {
          const newAccount = cloneDeep(prev);
          newAccount.openPositionAmount =
            newAccount.openPositionAmount -
            interestPrice / newAccount.openPrice;
          newAccount.openPositionValue =
            newAccount.openPositionValue - loanInfo.interest.futurePayFee;
          newAccount.currentPositionValue =
            newAccount.openPositionValue - loanInfo.interest.futurePayFee;
          return newAccount;
        });
      } else if (futureActive.isShortActive) {
        setShortAccount((prev) => {
          const newAccount = cloneDeep(prev);
          newAccount.openPositionAmount =
            newAccount.openPositionAmount -
            interestPrice / newAccount.openPrice;
          newAccount.openPositionValue =
            newAccount.openPositionValue - loanInfo.interest.futurePayFee;
          newAccount.currentPositionValue =
            newAccount.openPositionValue - loanInfo.interest.futurePayFee;
          return newAccount;
        });
      }
    } else {
      console.error("PayInterest Able, but not Working?");
    }
  };

  const resetAccount = () => {
    resetCashAccount();
    resetLongAccount();
    resetShortAccount();
  };

  const resetButtonHandler = () => {
    setModalVisible((prev) => !prev);
  };

  const setLevelDown = () => {
    resetTurnNumber();
    resetAccount();
    setLevelNumber((prev) => {
      if (prev > 1) return prev - 1;
      else return 1;
    });
  };

  const nextTurnHandler = () => {
    if (interestTurnNumber == 1) {
      if (loanInfo.interest.payAble) {
        payInterest();
        setTurnNumber((prev) => prev + 1);
        setIsCandleMoving(true);
      } else {
        alert("????????? ?????? ????????? ?????????????????????.\n ????????? ?????? ?????????.");
        setLevelDown();
      }
    } else if (loanTurnNumber == 1) {
      alert("????????? ?????? ????????? ?????????????????????.\n ????????? ?????? ?????????.");
      setLevelDown();
    } else {
      setTurnNumber((prev) => prev + 1);
      setIsCandleMoving(true);
    }
  };

  return (
    <View style={rootStyles.rootControlButton}>
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <AccountResetButtonContainer
          onPress={resetButtonHandler}
          disabled={isCandleMoving}
        >
          <ResetButtonText>??????</ResetButtonText>
        </AccountResetButtonContainer>
        <ResetModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <View
        style={{
          flex: 4,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingRight: 25,
        }}
      >
        <NextTurnButtonContainer
          onPress={nextTurnHandler}
          disabled={isCandleMoving}
        >
          <NextTurnButtonText>Next Turn</NextTurnButtonText>
        </NextTurnButtonContainer>
      </View>
    </View>
  );
}

export default RootControlButton;
