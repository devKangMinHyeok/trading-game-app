import { Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  cashAccountState,
  isCandleMovingState,
  levelNumberState,
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
import {
  NextTurnButtonText,
  ResetButtonText,
} from "../../styles/TextStyledComponents";

function RootControlButton() {
  const [turnNumber, setTurnNumber] = useRecoilState(turnNumberState);
  const resetCashAccount = useResetRecoilState(cashAccountState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const resetShortAccount = useResetRecoilState(shortAccountState);
  const resetLevelNumber = useResetRecoilState(levelNumberState);
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
    resetLevelNumber();
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
          <ResetButtonText>리셋</ResetButtonText>
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
          <NextTurnButtonText>Next Turn</NextTurnButtonText>
        </NextTurnButtonContainer>
      </View>
    </View>
  );
}

export default RootControlButton;
