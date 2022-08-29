import { memo } from "react";
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
} from "../../atom";
import rootStyles from "../../styles/rootStyles";
import EmptyPositionBox from "./EmptyPositionBox";
import PositionBox from "./position-box/PositionBox";
import PositionInfoViewer from "./PositionInfoViewer";

function PositionInfo() {
  const isCandleMoving = useRecoilValue(isCandleMovingState);

  const [cashAccount, setCashAccount] = useRecoilState(cashAccountState);
  const longAccountDetail = useRecoilValue(longAccountDetailState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  const resetShortAccount = useResetRecoilState(shortAccountState);
  const lastClosePrice = useRecoilValue(lastClosePriceState);

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

  return (
    <View style={rootStyles.positionInfo}>
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
  );
}

export default memo(PositionInfo);
