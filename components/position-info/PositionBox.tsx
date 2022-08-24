import { Text, TouchableOpacity, View } from "react-native";
import convertKrNumberType from "../../functions/convertKrNumberType";
import { IFutureAccountDetail } from "../../interfaces/interface";

interface PositionBoxProps {
  isLong: boolean;
  accountDetail: IFutureAccountDetail;
  closeHandler: () => void;
}

function PositionBox({
  accountDetail,
  closeHandler,
  isLong,
}: PositionBoxProps) {
  return (
    <View>
      <Text>{isLong ? "Long" : "Short"}</Text>
      <Text>레버리지 : x{accountDetail.leverage}</Text>
      <Text>
        진입 포지션 가치 :{" "}
        {convertKrNumberType(Math.ceil(accountDetail.openPositionValue))}원
      </Text>
      <Text>
        미실현 손익 :{" "}
        {convertKrNumberType(Math.ceil(accountDetail.unrealizedPnl))}원{" "}
        {(accountDetail.profitRate * 100).toFixed(2)}%
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: "red", height: "100%" }}
        onPress={closeHandler}
      >
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PositionBox;
