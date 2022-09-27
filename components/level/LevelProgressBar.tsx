import { memo } from "react";
import { Text, View } from "react-native";
import { ProgressBar, Colors } from "react-native-paper";
import convertKrNumberType from "../../functions/convertKrNumberType";
import {
  ProgressValueText,
  TargetValueText,
} from "../../styles/TextStyledComponents";

interface LevelProgressBarProps {
  progressRate: number;
  targetValue: number;
}

function LevelProgressBar({
  progressRate,
  targetValue,
}: LevelProgressBarProps) {
  return (
    <View style={{ width: "70%" }}>
      <ProgressBar progress={progressRate} color={Colors.greenA200} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ProgressValueText>
          {(progressRate * 100).toFixed(2)}%
        </ProgressValueText>
        <TargetValueText>{convertKrNumberType(targetValue)}</TargetValueText>
      </View>
    </View>
  );
}

export default memo(LevelProgressBar);
