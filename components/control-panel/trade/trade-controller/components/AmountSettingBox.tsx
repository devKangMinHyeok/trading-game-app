import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { memo } from "react";
import { View } from "react-native";
import { ISize } from "../../../../../hooks/useComponentSize";
import {
  ControlSectionTitleText,
  ControlSectionValueText,
} from "../../../../../styles/TextStyledComponents";
import theme from "../../../../../styles/theme";

interface AmountSettingBoxProps {
  parentSize: ISize;
  isLongSelected: boolean;
  amountRate: number;
  setAmountRate: (value: number) => void;
}

function AmountSettingBox({
  parentSize,
  isLongSelected,
  amountRate,
  setAmountRate,
}: AmountSettingBoxProps) {
  const amountRateHandler = (value: number[]) => {
    setAmountRate(value[0]);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <MultiSlider
        sliderLength={parentSize.width * 0.8 || 200}
        values={[amountRate]}
        onValuesChange={amountRateHandler}
        min={0}
        max={101}
        step={5}
        snapped={true}
        markerStyle={{
          width: 18,
          height: 18,
          backgroundColor: isLongSelected
            ? theme.colors.longButtonColor
            : theme.colors.shortButtonColor,
        }}
        selectedStyle={{
          backgroundColor: isLongSelected
            ? theme.colors.longButtonColor
            : theme.colors.shortButtonColor,
        }}
        trackStyle={{ backgroundColor: theme.colors.toneDownTextColor }}
      />

      <ControlSectionTitleText> {amountRate}%</ControlSectionTitleText>
    </View>
  );
}

export default memo(AmountSettingBox);
