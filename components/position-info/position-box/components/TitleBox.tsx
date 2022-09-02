import { memo } from "react";
import { Text, View } from "react-native";
import { PositionTitleBoxText } from "../../../../styles/TextStyledComponents";
import theme from "../../../../styles/theme";

interface TitleBoxProps {
  isLong: boolean;
}

function TitleBox({ isLong }: TitleBoxProps) {
  return (
    <View
      style={{
        marginTop: 5,
        marginBottom: 5,
        width: 20,
        height: 20,
        borderRadius: 4,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isLong
          ? theme.colors.positiveTextColor
          : theme.colors.negativeTextColor,
      }}
    >
      <PositionTitleBoxText isLong={isLong}>
        {isLong ? "롱" : "숏"}
      </PositionTitleBoxText>
    </View>
  );
}

export default memo(TitleBox);
