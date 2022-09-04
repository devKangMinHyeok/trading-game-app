import { Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  cashAccountState,
  isCandleMovingState,
  longAccountState,
  shortAccountState,
  turnNumberState,
} from "../../atom";
import {
  AccountResetButtonContainer,
  BaseButton,
  NextTurnButtonContainer,
} from "../../styles/buttonStyles";
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
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <AccountResetButtonContainer
          onPress={resetButtonHandler}
          disabled={isCandleMoving}
        >
          <Text>리셋</Text>
        </AccountResetButtonContainer>
      </View>
      <View
        style={{
          flex: 3.5,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <NextTurnButtonContainer
          onPress={nextTurnHandler}
          disabled={isCandleMoving}
        >
          <Text>Next Turn</Text>
        </NextTurnButtonContainer>
      </View>
    </View>
  );
}

export default RootControlButton;
