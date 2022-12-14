import { memo, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import {
  isCandleMovingState,
  levelInfoState,
  levelNumberState,
  totalAccountState,
  turnNumberState,
} from "../../atom";

import rootStyles from "../../styles/rootStyles";
import LevelLabelBox from "./LevelLabelBox";
import LevelProgressBar from "./LevelProgressBar";
import LevelUpButton from "./LevelUpButton";

function LevelInfoBox() {
  const turnNumber = useRecoilValue(turnNumberState);
  const levelNumber = useRecoilValue(levelNumberState);
  const levelInfo = useRecoilValue(levelInfoState);
  const totalAccount = useRecoilValue(totalAccountState);
  const isCandleMoving = useRecoilValue(isCandleMovingState);
  const [progressRate, setProgressRate] = useState<number>(
    totalAccount.totalAsset / levelInfo.loan
  );
  const [isReadyToLevelUp, setIsReadyToLevelUp] = useState<boolean>(
    progressRate >= 1
  );

  useEffect(() => {
    if (!isCandleMoving) {
      setProgressRate(totalAccount.totalAsset / levelInfo.loan);
    }
  }, [isCandleMoving, levelNumber, turnNumber]);

  useEffect(() => {
    setIsReadyToLevelUp(progressRate >= 1);
  }, [progressRate]);

  return (
    <View style={rootStyles.level}>
      <View
        style={{
          flex: 2.7,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <LevelLabelBox label={levelInfo.levelName} color={levelInfo.color} />
        <LevelProgressBar
          progressRate={progressRate}
          targetValue={levelInfo.loan}
        />
      </View>
      <View style={{ flex: 1, paddingRight: 10 }}>
        <LevelUpButton isReadyToLevelUp={isReadyToLevelUp} />
      </View>
    </View>
  );
}

export default memo(LevelInfoBox);
