import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
import convertKrNumberType from "../../functions/convertKrNumberType";
import rootStyles from "../../styles/rootStyles";
import EmptyPositionBox from "./EmptyPositionBox";
import PositionBox from "./PositionBox";

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
        <PositionBox
          accountDetail={longAccountDetail}
          closeHandler={longCloseHandler}
          isLong={true}
        />
      ) : (
        <EmptyPositionBox />
      )}
      {shortAccountDetail.positionActive ? (
        <PositionBox
          accountDetail={shortAccountDetail}
          closeHandler={shortCloseHandler}
          isLong={false}
        />
      ) : (
        <EmptyPositionBox />
      )}
    </View>
  );
}

export default memo(PositionInfo);
