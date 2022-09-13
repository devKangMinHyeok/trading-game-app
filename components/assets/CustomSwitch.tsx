import { memo } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const switchStyle = (
  disabled?: boolean,
  selectedValue?: number | boolean,
  selectedColor?: string,
  nonSelectedColor?: string,
  thisValue?: number | boolean
) => {
  return StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      width: "100%",
      height: "100%",
      flexDirection: "row",
      opacity: disabled ? 0.5 : 1,
    },
    box: {
      flex: 1,
      backgroundColor: "transprent",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor:
        selectedValue === thisValue ? selectedColor : nonSelectedColor,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

const textStyle = (
  disabled?: boolean,
  selectedValue?: number | boolean,
  selectedColor?: string,
  nonSelectedColor?: string,
  thisValue?: number | boolean
) => {
  return StyleSheet.create({
    text: {
      color: selectedValue === thisValue ? selectedColor : nonSelectedColor,
    },
  });
};

export interface CustomToggleSwitchProps {
  options: { label: string; value: number | boolean }[];
  value: number | boolean;
  setValueFunction: React.Dispatch<React.SetStateAction<number | boolean>>;
  disabled?: boolean;
  selectedColor?: string;
  nonSelectedColor?: string;
}

function CustomToggleSwitch({
  options,
  value,
  setValueFunction,
  disabled,
  selectedColor = "#32D993",
  nonSelectedColor = "#bebebe",
}: CustomToggleSwitchProps) {
  const onPressHandler = (
    evt: GestureResponderEvent,
    newValue: number | boolean
  ) => {
    setValueFunction(newValue);
  };
  return (
    <View style={switchStyle(disabled).container}>
      {options.map((ele, index) => (
        <TouchableOpacity
          key={index}
          onPress={(evt) => onPressHandler(evt, ele.value)}
          style={
            switchStyle(
              disabled,
              value,
              selectedColor,
              nonSelectedColor,
              ele.value
            ).box
          }
          disabled={disabled}
        >
          <Text
            style={
              textStyle(
                disabled,
                value,
                selectedColor,
                nonSelectedColor,
                ele.value
              ).text
            }
          >
            {ele.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default memo(CustomToggleSwitch);
