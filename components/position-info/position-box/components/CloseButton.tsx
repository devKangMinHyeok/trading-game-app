import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

interface CloseButtonProps {
  closeHandler: () => void;
}

function CloseButton({ closeHandler }: CloseButtonProps) {
  return (
    <TouchableOpacity
      style={{ backgroundColor: "red", height: "100%" }}
      onPress={closeHandler}
    >
      <Text>Close</Text>
    </TouchableOpacity>
  );
}

export default memo(CloseButton);
