import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { VictoryAxis, VictoryCandlestick, VictoryChart } from "victory-native";
import {
  candleDataState,
  isCandleMovingState,
  lastClosePriceState,
  longAccountDetailState,
  longAccountState,
  shortAccountDetailState,
  shortAccountState,
  turnNumberState,
} from "../../atom";
import candleGenerator from "../../functions/candleGenerator";
import {
  CANDLE_MOVING_UNIT_MS,
  SPLIT_UNIT_OF_CANDLE,
} from "../../globalConstant";
import { ICandleStick } from "../../interfaces/interface";

function CandleChart() {
  const turnNumber = useRecoilValue(turnNumberState);
  const [candleData, setCandleData] = useRecoilState(candleDataState);
  const [isCandleMoving, setIsCandleMoving] =
    useRecoilState(isCandleMovingState);
  const [lastClosePrice, setLastClosePrice] =
    useRecoilState(lastClosePriceState);
  const [longAccount, setLongAccount] = useRecoilState(longAccountState);
  const [shortAccount, setShortAccount] = useRecoilState(shortAccountState);
  const longAccountDetail = useRecoilValue(longAccountDetailState);
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const resetShortAccount = useResetRecoilState(shortAccountState);

  const updateCandleData = (
    newCandle: ICandleStick,
    index: number,
    lastIndex: number
  ) => {
    return setTimeout(() => {
      setCandleData((prev) => {
        const newData = cloneDeep(prev);
        if (newData.slice(-1)[0].x.toString() == newCandle.x.toString()) {
          newData.pop();
          newData.push(newCandle);
        } else {
          newData.push(newCandle);
        }
        return newData;
      });

      setLastClosePrice(newCandle.close);

      if (longAccountDetail.positionActive) {
        setLongAccount((prev) => {
          const newLog = cloneDeep(prev);
          newLog.currentPositionValue =
            newCandle.close * newLog.openPositionAmount;
          return newLog;
        });
        if (longAccountDetail.liquidPrice >= newCandle.low) {
          resetLongAccount();
        }
      }

      if (shortAccountDetail.positionActive) {
        setShortAccount((prev) => {
          const newLog = cloneDeep(prev);
          newLog.currentPositionValue =
            newCandle.close * newLog.openPositionAmount;
          return newLog;
        });
        if (shortAccountDetail.liquidPrice <= newCandle.high) {
          resetShortAccount();
        }
      }

      if (index === lastIndex) {
        setIsCandleMoving(false);
      }
    }, CANDLE_MOVING_UNIT_MS * index);
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (turnNumber > 1) {
      const lastDate = candleData.slice(-1)[0].x;
      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + 1);
      const lastPrice = candleData.slice(-1)[0].close;
      const newCandleSet = candleGenerator(
        nextDate,
        lastPrice,
        SPLIT_UNIT_OF_CANDLE
      );
      for (let i = 0; i < newCandleSet.length; i++) {
        const newCandle = newCandleSet[i];
        timers.push(updateCandleData(newCandle, i, newCandleSet.length - 1));
      }

      return () => {
        timers.forEach((ele) => clearTimeout(ele));
      };
    }
  }, [turnNumber]);

  return (
    <View>
      <VictoryChart domainPadding={{ x: 70 }}>
        <VictoryAxis dependentAxis />
        <VictoryCandlestick
          candleColors={{ positive: "#c43a31", negative: "#316cc4" }}
          data={candleData}
        />
      </VictoryChart>
    </View>
  );
}

export default CandleChart;
