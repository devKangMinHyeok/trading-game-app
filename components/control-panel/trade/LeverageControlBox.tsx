import { memo } from "react";
import { Text, View } from "react-native";
import { LEVERAGE_UNITS } from "../../../globalConstant";
import CustomToggleSwitch from "../../assets/CustomSwitch";
interface LeverageControlBoxProps {
  activeLeverage: number;
  leverage: number;
  setLeverage: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
}

function LeverageControlBox({
  activeLeverage,
  leverage,
  setLeverage,
  disabled,
}: LeverageControlBoxProps) {
  return (
    <View>
      <Text>레버리지</Text>
      <CustomToggleSwitch
        options={LEVERAGE_UNITS}
        value={activeLeverage ? activeLeverage : leverage}
        setValueFunction={setLeverage}
        disabled={disabled}
      />
    </View>
  );
}

export default memo(LeverageControlBox);
