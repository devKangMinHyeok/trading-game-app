import { memo } from "react";
import { Text, View } from "react-native";
import { ProgressBar, Colors } from "react-native-paper";
import { ProgressValueText } from "../../styles/TextStyledComponents";

interface LevelProgressBarProps {
  progressRate: number;
}

function LevelProgressBar({ progressRate }: LevelProgressBarProps) {
  return (
    <View style={{ width: "70%" }}>
      <ProgressBar progress={progressRate} color={Colors.greenA200} />
      <View style={{ alignItems: "flex-end" }}>
        <ProgressValueText>
          {(progressRate * 100).toFixed(2)}%
        </ProgressValueText>
      </View>
    </View>
  );
}

export default memo(LevelProgressBar);
