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
  thisValue?: number | boolean
) =>
  StyleSheet.create({
    container: {
      backgroundColor: "whitesmoke",
      width: "80%",
      flexDirection: "row",
      opacity: disabled ? 0.5 : 1,
    },
    box: {
      flex: 1,
      padding: 5,
      backgroundColor: selectedValue === thisValue ? "red" : "skyblue",
    },
  });

export interface CustomToggleSwitchProps {
  options: { label: string; value: number | boolean }[];
  value: number | boolean;
  setValueFunction: React.Dispatch<React.SetStateAction<number | boolean>>;
  disabled?: boolean;
}

function CustomToggleSwitch({
  options,
  value,
  setValueFunction,
  disabled,
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
          style={switchStyle(disabled, value, ele.value).box}
          disabled={disabled}
        >
          <Text>{ele.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default memo(CustomToggleSwitch);
