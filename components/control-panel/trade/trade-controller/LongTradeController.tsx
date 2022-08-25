import { useRecoilValue } from "recoil";
import { longAccountDetailState } from "../../../../atom";
import TradeController from "./TradeController";

function LongTradeController() {
  const longAccountDetail = useRecoilValue(longAccountDetailState);

  return (
    <TradeController
      disabled={longAccountDetail.positionActive}
      activeLeverage={
        longAccountDetail.positionActive ? longAccountDetail.leverage : null
      }
    />
  );
}

export default LongTradeController;
