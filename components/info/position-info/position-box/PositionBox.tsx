import { View } from "react-native";
import { IFutureAccountDetail } from "../../../../interfaces/interface";
import CloseButton from "./components/CloseButton";
import PositionSettingInfo from "./components/CurrentPositionInfo";
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
    <View style={{ height: "100%", flexDirection: "column", padding: 5 }}>
      <View style={{ flex: 1, flexDirection: "row", paddingRight: 10 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TitleBox isLong={isLong} />
          <LeverageInfoBox isLong={isLong} leverage={accountDetail.leverage} />
        </View>
        <View style={{ flex: 1 }}>
          <CloseButton isLong={isLong} closeHandler={closeHandler} />
        </View>
      </View>
      <View style={{ flex: 5, justifyContent: "space-evenly" }}>
        <ProfitInfoBox
          unrealizedPnl={accountDetail.unrealizedPnl}
          profitRate={accountDetail.profitRate}
          isPositive={accountDetail.isPositive}
        />
        <OpenPositionInfo
          openPositionValue={accountDetail.openPositionValue}
          currentfutureTotalAsset={accountDetail.totalAsset}
          isPositive={accountDetail.isPositive}
        />
        <PositionSettingInfo
          liquidPrice={accountDetail.liquidPrice}
          openPrice={accountDetail.openPrice}
          isLong={isLong}
        />
      </View>
    </View>
  );
}

export default PositionBox;
