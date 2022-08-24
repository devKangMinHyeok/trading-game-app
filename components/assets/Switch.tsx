import SwitchSelector from "react-native-switch-selector";

interface SwitchSelectorFix extends React.Component {}

const Switch = SwitchSelector as any as {
  new (): SwitchSelectorFix;
};
export default Switch;
