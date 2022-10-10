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

  const resetConfirmHandler = () => {
    setModalVisible(!isModalVisible);
    resetGame();
  };

  const resetCandelHandler = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>계좌를 초기화 하시겠습니까?</Text>
            <Text>(레벨도 초기화 됩니다.)</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button title="초기화" onPress={resetConfirmHandler} />
            <Button title="취소" onPress={resetCandelHandler} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ResetModal;
