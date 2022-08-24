import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

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
    <TouchableOpacity
      style={{
        backgroundColor: "green",
        height: "100%",
        opacity: isCandleMoving ? 0.5 : 1,
      }}
      onPress={buttonHandler}
      disabled={isCandleMoving}
    >
      <Text>{isBuy ? "BUY" : "Sell"}</Text>
    </TouchableOpacity>
  );
}

export default memo(TradeButton);
