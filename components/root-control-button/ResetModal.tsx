import { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useResetRecoilState } from "recoil";
import {
  cashAccountState,
  levelNumberState,
  longAccountState,
  shortAccountState,
  turnNumberState,
} from "../../atom";
import {
  ResetCancelButtonContainer,
  ResetConfirmButtonContainer,
} from "../../styles/buttonStyles";
import { ResetModalText } from "../../styles/TextStyledComponents";
import theme from "../../styles/theme";

interface ResetModalProps {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ResetModal({ isModalVisible, setModalVisible }: ResetModalProps) {
  const resetCashAccount = useResetRecoilState(cashAccountState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const resetShortAccount = useResetRecoilState(shortAccountState);
  const resetLevelNumber = useResetRecoilState(levelNumberState);
  const resetTurnNumber = useResetRecoilState(turnNumberState);

  const resetAccount = () => {
    resetCashAccount();
    resetLongAccount();
    resetShortAccount();
  };

  const resetGame = () => {
    resetTurnNumber();
    resetAccount();
    resetLevelNumber();
  };

  const resetConfirmHandler = () => {
    setModalVisible(!isModalVisible);
    resetGame();
  };

  const resetCandelHandler = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: theme.colors.backgroundColor3,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View style={{ alignItems: "center", padding: 10 }}>
            <ResetModalText>계좌를 초기화 하시겠습니까?</ResetModalText>
            <ResetModalText>(레벨도 초기화 됩니다.)</ResetModalText>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <ResetCancelButtonContainer onPress={resetCandelHandler}>
                <Text>취소</Text>
              </ResetCancelButtonContainer>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <ResetConfirmButtonContainer onPress={resetConfirmHandler}>
                <ResetModalText>초기화</ResetModalText>
              </ResetConfirmButtonContainer>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ResetModal;
