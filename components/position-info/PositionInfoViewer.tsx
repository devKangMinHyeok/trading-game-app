import { memo } from "react";
import { IFutureAccountDetail } from "../../interfaces/interface";
import EmptyPositionBox from "./EmptyPositionBox";
import PositionBox from "./position-box/PositionBox";

interface PositionInfoViewerProps {
  accountDetail: IFutureAccountDetail;
  closeHandler: () => void;
  isLong: boolean;
}

function PositionInfoViewer({
  accountDetail,
  closeHandler,
  isLong,
}: PositionInfoViewerProps) {
  return (
    <>
      <PositionBox
        accountDetail={accountDetail}
        closeHandler={closeHandler}
        isLong={isLong}
      />
    </>
  );
}

export default memo(PositionInfoViewer);
