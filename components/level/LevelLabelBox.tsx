import { memo } from "react";
import { View } from "react-native";
import { LevelLabelText } from "../../styles/TextStyledComponents";

interface LevelLabelBoxProps {
  label: string;
  color: string;
}

function LevelLabelBox({ label, color }: LevelLabelBoxProps) {
  return (
    <View style={{ backgroundColor: color, padding: 3, marginRight: 5 }}>
      <LevelLabelText>{label}</LevelLabelText>
    </View>
  );
}

export default memo(LevelLabelBox);
