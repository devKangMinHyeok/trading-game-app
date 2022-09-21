import { memo } from "react";
import { View } from "react-native";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  cashAccountState,
  levelNumberState,
  longAccountState,
  shortAccountState,
  turnNumberState,
} from "../../atom";
import { LevelUpButtonContainer } from "../../styles/buttonStyles";
import { LevelUpText } from "../../styles/TextStyledComponents";

interface LevelUpButtonProps {
  isReadyToLevelUp: boolean;
}

function LevelUpButton({ isReadyToLevelUp }: LevelUpButtonProps) {
  const [levelNumber, setLevelNumber] = useRecoilState(levelNumberState);
  const resetTurnNumber = useResetRecoilState(turnNumberState);
  const resetCashAccount = useResetRecoilState(cashAccountState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const resetShortAccount = useResetRecoilState(shortAccountState);

  const levelUpHandler = () => {
    if (levelNumber < 7) {
      setLevelNumber((prev) => prev + 1);
      resetCashAccount();
      resetLongAccount();
      resetShortAccount();
      resetTurnNumber();
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <LevelUpButtonContainer
        disabled={!isReadyToLevelUp}
        onPress={levelUpHandler}
      >
        <LevelUpText>레벨업</LevelUpText>
      </LevelUpButtonContainer>
    </View>
  );
}

export default memo(LevelUpButton);
