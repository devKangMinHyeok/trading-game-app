import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import rootStyles from "../../../styles/rootStyles";

interface SwitchSelectorFix extends React.Component {}

const Switch = SwitchSelector as any as {
  new (): SwitchSelectorFix;
};

function Trade() {
  const [isLongSelected, setIsLongSelected] = useState(true);
  const switchProps: any = {
    options: [
      { label: "Long", value: true },
      { label: "Short", value: false },
    ],
    initial: 0,
    onPress: (value: boolean) => setIsLongSelected(value),
  };

  return (
    <View style={rootStyles.trade}>
      <Switch {...switchProps} />
      <Text>{isLongSelected ? "Long" : "Short"}</Text>
    </View>
  );
}

export default Trade;
