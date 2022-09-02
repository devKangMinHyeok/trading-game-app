import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { CloseButtonContainer } from "../../../../styles/buttonStyles";
import { PositionCloseButtonText } from "../../../../styles/TextStyledComponents";

interface CloseButtonProps {
  isLong: boolean;
  closeHandler: () => void;
}

function CloseButton({ isLong, closeHandler }: CloseButtonProps) {
  return (
    <CloseButtonContainer onPress={closeHandler}>
      <PositionCloseButtonText isLong={isLong}>
        포지션 종료
      </PositionCloseButtonText>
    </CloseButtonContainer>
  );
}

export default memo(CloseButton);
