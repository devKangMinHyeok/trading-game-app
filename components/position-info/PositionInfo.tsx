import { memo } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { VictoryContainer, VictoryPie } from "victory-native";
import {
  cashAccountState,
  isCandleMovingState,
  lastClosePriceState,
  longAccountDetailState,
  longAccountState,
  shortAccountDetailState,
  shortAccountState,
} from "../../atom";
import rootStyles, { SCREEN_WIDTH } from "../../styles/rootStyles";
import EmptyPositionBox from "./EmptyPositionBox";
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
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <VictoryPie
          width={SCREEN_WIDTH / 2}
          height={SCREEN_WIDTH / 2}
          padding={{ top: 30, bottom: 30 }}
          data={[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 40 },
            { x: "Birds", y: 55 },
          ]}
          labels={({ datum }) => datum.y}
          labelPosition={"centroid"}
          labelRadius={({ innerRadius }) => Number(innerRadius) + 50}
          containerComponent={<VictoryContainer responsive={true} />}
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
