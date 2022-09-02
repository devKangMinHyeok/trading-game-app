import { View } from "react-native";
import convertKrNumberType from "../../../../functions/convertKrNumberType";
import {
  LiquidValueText,
  OpenValueText,
  PositionInfoTitleBoxText,
  PositionInfoValueBoxText,
} from "../../../../styles/TextStyledComponents";

interface PositionSettingInfoProps {
  liquidPrice: number;
  openPrice: number;
  isLong: boolean;
}

function PositionSettingInfo({
  liquidPrice,
  openPrice,
  isLong,
}: PositionSettingInfoProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1.3 }}>
        <PositionInfoTitleBoxText>청산가</PositionInfoTitleBoxText>
        <LiquidValueText isLong={isLong}>
          {convertKrNumberType(Number(liquidPrice.toFixed(2)))}
        </LiquidValueText>
      </View>
      <View style={{ flex: 1 }}>
        <PositionInfoTitleBoxText>평단가</PositionInfoTitleBoxText>
        <OpenValueText>
          {convertKrNumberType(Number(openPrice.toFixed(2)))}
        </OpenValueText>
      </View>
    </View>
  );
}

export default PositionSettingInfo;
