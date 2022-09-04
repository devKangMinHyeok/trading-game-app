import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { OpenButtonContainer } from "../../../../../styles/buttonStyles";
import { OpenButtonText } from "../../../../../styles/TextStyledComponents";

interface TradeButtonProps {
  isCandleMoving: boolean;
  buttonHandler: () => void;
  isBuy: boolean;
}

function TradeButton({
  isCandleMoving,
  buttonHandler,
  isBuy,
}: TradeButtonProps) {
  return (
    <OpenButtonContainer onPress={buttonHandler} disabled={isCandleMoving}>
      <OpenButtonText isLong={isBuy}>
        {isBuy ? "BUY / 롱" : "Sell / 숏"}
      </OpenButtonText>
    </OpenButtonContainer>
  );
}

export default memo(TradeButton);
