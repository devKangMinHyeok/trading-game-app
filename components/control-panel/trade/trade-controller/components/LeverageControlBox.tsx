import { memo } from "react";
import { Text, View } from "react-native";
import { LEVERAGE_UNITS } from "../../../../../globalConstant";
import { ControlSectionTitleText } from "../../../../../styles/TextStyledComponents";
import theme from "../../../../../styles/theme";
import CustomToggleSwitch from "../../../../assets/CustomSwitch";
interface LeverageControlBoxProps {
  isLongSelected: boolean;
  activeLeverage: number;
  leverage: number;
  setLeverage: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
}

function LeverageControlBox({
  isLongSelected,
  activeLeverage,
  leverage,
  setLeverage,
  disabled,
}: LeverageControlBoxProps) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ marginTop: 10 }}>
        <CustomToggleSwitch
          options={LEVERAGE_UNITS}
          value={activeLeverage ? activeLeverage : leverage}
          setValueFunction={setLeverage}
          disabled={disabled}
          selectedColor={
            isLongSelected
              ? theme.colors.longButtonColor
              : theme.colors.shortButtonColor
          }
          nonSelectedColor={theme.colors.toneDownTextColor}
        />
      </View>
    </View>
  );
}

export default memo(LeverageControlBox);
