import { View } from "react-native";
import { IFutureAccountDetail } from "../../../interfaces/interface";
import CloseButton from "./components/CloseButton";
import LeverageInfoBox from "./components/LeverageInfoBox";
import OpenPositionInfo from "./components/OpenPositionInfo";
import ProfitInfoBox from "./components/ProfitInfoBox";
import TitleBox from "./components/TitleBox";

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
      <TitleBox isLong={isLong} />
      <LeverageInfoBox leverage={accountDetail.leverage} />
      <OpenPositionInfo openPositionValue={accountDetail.openPositionValue} />
      <ProfitInfoBox
        unrealizedPnl={accountDetail.unrealizedPnl}
        profitRate={accountDetail.profitRate}
      />
      <CloseButton closeHandler={closeHandler} />
    </View>
  );
}

export default PositionBox;
