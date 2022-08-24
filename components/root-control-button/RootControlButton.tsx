import { Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  cashAccountState,
  isCandleMovingState,
  longAccountState,
  shortAccountState,
  turnNumberState,
} from "../../atom";
import rootStyles from "../../styles/rootStyles";

function RootControlButton() {
  const [turnNumber, setTurnNumber] = useRecoilState(turnNumberState);
  const resetCashAccount = useResetRecoilState(cashAccountState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const resetShortAccount = useResetRecoilState(shortAccountState);
  const [isCandleMoving, setIsCandleMoving] =
    useRecoilState(isCandleMovingState);
  const nextTurnHandler = () => {
    setIsCandleMoving(true);
    setTurnNumber((prev) => prev + 1);
  };
  const resetButtonHandler = () => {
    resetCashAccount();
    resetLongAccount();
    resetShortAccount();
  };

  return (
    <View style={rootStyles.rootControlButton}>
      <TouchableOpacity
        onPress={resetButtonHandler}
        style={
          isCandleMoving
            ? {
                flex: 1,
                backgroundColor: "red",
                height: "100%",
                opacity: 0.6,
              }
            : { flex: 1, backgroundColor: "red", height: "100%" }
        }
        disabled={isCandleMoving}
      >
        <Text>계좌 초기화</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={nextTurnHandler}
        style={
          isCandleMoving
            ? {
                flex: 2,
                backgroundColor: "skyblue",
                height: "100%",
                opacity: 0.6,
              }
            : { flex: 2, backgroundColor: "skyblue", height: "100%" }
        }
        disabled={isCandleMoving}
      >
        <Text>Next Turn</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RootControlButton;
