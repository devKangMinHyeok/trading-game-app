import { memo } from "react";
import { Text, View } from "react-native";
import { Colors, ProgressBar } from "react-native-paper";

interface LoanProgressBarProps {
  progressRate: number;
}

function LoanProgressBar({ progressRate }: LoanProgressBarProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 4,
        }}
      >
        <ProgressBar progress={progressRate} color={Colors.greenA200} />
      </View>
      <View style={{ flex: 1, marginLeft: 3 }}>
        <Text>{(progressRate * 100).toFixed(2)}%</Text>
      </View>
    </View>
  );
}

export default memo(LoanProgressBar);
