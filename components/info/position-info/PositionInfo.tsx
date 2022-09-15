import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  cashAccountState,
  isCandleMovingState,
  levelInfoState,
  longAccountDetailState,
  longAccountState,
  shortAccountDetailState,
  shortAccountState,
  totalAccountState,
} from "../../../atom";
import useComponentSize from "../../../hooks/useComponentSize";
import rootStyles from "../../../styles/rootStyles";
import CustomVictoryStack from "../../assets/CustomVictoryStack";
import EmptyPositionBox from "./EmptyPositionBox";
import PositionInfoViewer from "./PositionInfoViewer";

function PositionInfo() {
  const isCandleMoving = useRecoilValue(isCandleMovingState);
  const levelInfo = useRecoilValue(levelInfoState);

  const [cashAccount, setCashAccount] = useRecoilState(cashAccountState);
  const longAccountDetail = useRecoilValue(longAccountDetailState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  const resetShortAccount = useResetRecoilState(shortAccountState);
  const totalAcount = useRecoilValue(totalAccountState);

  const [barCashRate, setBarCashRate] = useState(
    totalAcount.cash / totalAcount.totalAsset
  );
  const [barFutureRate, setBarFutureRate] = useState(
    totalAcount.futureValuation / totalAcount.totalAsset
  );

  const { size, onLayout } = useComponentSize();

  const longCloseHandler = () => {
    if (!isCandleMoving) {
      setCashAccount(
        (prev) =>
          prev +
          longAccountDetail.totalAsset *
            (1 -
              (levelInfo.transactionFeeRate * longAccountDetail.leverage) / 100)
      );
      resetLongAccount();
    }
  };

  const shortCloseHandler = () => {
    if (!isCandleMoving) {
      setCashAccount(
        (prev) =>
          prev +
          shortAccountDetail.totalAsset *
            (1 -
              (levelInfo.transactionFeeRate * shortAccountDetail.leverage) /
                100)
      );
      resetShortAccount();
    }
  };

  useEffect(() => {
    if (!isCandleMoving) {
      setBarCashRate(totalAcount.cash / totalAcount.totalAsset);
      setBarFutureRate(totalAcount.futureValuation / totalAcount.totalAsset);
    }
  }, [isCandleMoving, totalAcount]);

  return (
    <View style={rootStyles.positionInfo}>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <CustomVictoryStack
          parentSize={size}
          barCashRate={barCashRate}
          barFutureRate={barFutureRate}
          position={longAccountDetail.positionActive}
        />
      </View>
      <View style={{ flex: 2.5 }}>
        {longAccountDetail.positionActive ? (
          <PositionInfoViewer
            accountDetail={longAccountDetail}
            closeHandler={longCloseHandler}
            isLong={true}
          />
        ) : null}
        {shortAccountDetail.positionActive ? (
          <PositionInfoViewer
            accountDetail={shortAccountDetail}
            closeHandler={shortCloseHandler}
            isLong={false}
          />
        ) : null}
        {!longAccountDetail.positionActive &&
        !shortAccountDetail.positionActive ? (
          <EmptyPositionBox />
        ) : null}
      </View>
    </View>
  );
}

export default memo(PositionInfo);
