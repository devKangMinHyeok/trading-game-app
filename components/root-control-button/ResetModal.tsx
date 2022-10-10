import { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
function ResetModal({ visible }: { visible: boolean }) {
  const [isModalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
