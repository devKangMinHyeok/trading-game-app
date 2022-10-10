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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    resetGame();
  };
  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View style={{ backgroundColor: "white", padding: 10 }}>
          <View style={{ alignItems: "center" }}>
            <Text>계좌를 초기화 하시겠습니까?</Text>
            <Text>(레벨도 초기화 됩니다.)</Text>
          </View>
          <Button title="Reset" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default ResetModal;
