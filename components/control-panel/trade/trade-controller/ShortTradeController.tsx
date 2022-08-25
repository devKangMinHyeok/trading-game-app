import { useRecoilValue } from "recoil";
import { shortAccountDetailState } from "../../../../atom";
import TradeController from "./TradeController";

function ShortTradeController() {
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  return (
    <TradeController
      disabled={shortAccountDetail.positionActive}
      activeLeverage={
        shortAccountDetail.positionActive ? shortAccountDetail.leverage : null
      }
    />
  );
}

export default ShortTradeController;
