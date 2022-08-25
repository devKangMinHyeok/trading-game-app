import { memo } from "react";
import { IFutureAccountDetail } from "../../interfaces/interface";
import EmptyPositionBox from "./EmptyPositionBox";
import PositionBox from "./position-box/PositionBox";

interface PositionInfoViewerProps {
  positionActive: boolean;
  accountDetail: IFutureAccountDetail;
  closeHandler: () => void;
  isLong: boolean;
}

function PositionInfoViewer({
  positionActive,
  accountDetail,
  closeHandler,
  isLong,
}: PositionInfoViewerProps) {
  return (
    <>
      {positionActive ? (
        <PositionBox
          accountDetail={accountDetail}
          closeHandler={closeHandler}
          isLong={isLong}
        />
      ) : (
        <EmptyPositionBox />
      )}
    </>
  );
}

export default memo(PositionInfoViewer);
