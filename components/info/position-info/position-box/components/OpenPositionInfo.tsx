import { memo } from "react";
import { Text, View } from "react-native";
import convertKrNumberType from "../../../../../functions/convertKrNumberType";
import {
  PositionInfoTitleBoxText,
  PositionInfoValueBoxText,
  UnrealizedPnlBoxValue,
} from "../../../../../styles/TextStyledComponents";

interface OpenPositionInfoProps {
  openPositionValue: number;
  currentfutureTotalAsset: number;
  isPositive: string;
}

function OpenPositionInfo({
  openPositionValue,
  currentfutureTotalAsset,
  isPositive,
}: OpenPositionInfoProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1.3 }}>
        <PositionInfoTitleBoxText>총 매수</PositionInfoTitleBoxText>
        <PositionInfoValueBoxText>
          {convertKrNumberType(Math.ceil(openPositionValue))}
        </PositionInfoValueBoxText>
      </View>
      <View style={{ flex: 1 }}>
        <PositionInfoTitleBoxText>총 평가</PositionInfoTitleBoxText>
        <UnrealizedPnlBoxValue isPositive={isPositive}>
          {convertKrNumberType(Math.ceil(currentfutureTotalAsset))}
        </UnrealizedPnlBoxValue>
      </View>
    </View>
  );
}

export default memo(OpenPositionInfo);
