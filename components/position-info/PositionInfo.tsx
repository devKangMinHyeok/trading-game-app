import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  cashAccountState,
  isCandleMovingState,
  lastClosePriceState,
  longAccountDetailState,
  longAccountState,
  shortAccountDetailState,
  shortAccountState,
  totalAccountState,
} from "../../atom";
import rootStyles from "../../styles/rootStyles";
import CustomVictoryPie from "../assets/CustomVictoryPie";
import EmptyPositionBox from "./EmptyPositionBox";
import PositionInfoViewer from "./PositionInfoViewer";

function PositionInfo() {
  const isCandleMoving = useRecoilValue(isCandleMovingState);

  const [cashAccount, setCashAccount] = useRecoilState(cashAccountState);
  const longAccountDetail = useRecoilValue(longAccountDetailState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  const resetShortAccount = useResetRecoilState(shortAccountState);
  const totalAcount = useRecoilValue(totalAccountState);
  const lastClosePrice = useRecoilValue(lastClosePriceState);

  const [pieCashRate, setPieCashRate] = useState(
    totalAcount.cash / totalAcount.totalAsset
  );
  const [pieFutureRate, setPieFutureRate] = useState(
    totalAcount.futureValuation / totalAcount.totalAsset
  );

  const longCloseHandler = () => {
    if (!isCandleMoving) {
      setCashAccount((prev) => prev + longAccountDetail.totalAsset);
      resetLongAccount();
    }
  };

  const shortCloseHandler = () => {
    if (!isCandleMoving) {
      setCashAccount((prev) => prev + shortAccountDetail.totalAsset);
      resetShortAccount();
    }
  };

  useEffect(() => {
    if (!isCandleMoving) {
      setPieCashRate(totalAcount.cash / totalAcount.totalAsset);
      setPieFutureRate(totalAcount.futureValuation / totalAcount.totalAsset);
    }
  }, [isCandleMoving, totalAcount]);

  return (
    <View style={rootStyles.positionInfo}>
      <View style={{ flex: 1 }}>
        <CustomVictoryPie
          pieCashRate={pieCashRate}
          pieFutureRate={pieFutureRate}
        />
      </View>
      <View style={{ flex: 1 }}>
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
