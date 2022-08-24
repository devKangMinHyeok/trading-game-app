import { cloneDeep, round } from "lodash";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { DomainTuple } from "victory-core";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryCursorContainer,
  VictoryLine,
  VictoryLabel,
} from "victory-native";
import {
  candleDataState,
  isCandleMovingState,
  lastClosePriceState,
  lastOpenPriceState,
  longAccountDetailState,
  longAccountState,
  shortAccountDetailState,
  shortAccountState,
  turnNumberState,
} from "../../atom";
import candleGenerator from "../../functions/candleGenerator";
import {
  CANDLE_MOVING_UNIT_MS,
  CHART_X_DOMAIN_LENGTH,
  CHART_Y_DOMAIN_PADDING,
  INITIAL_CANDLE_LOW,
  LAST_OF_INITIAL_CANDLE_HIGH,
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
  const [lastOpenPrice, setLastOpenPrice] = useRecoilState(lastOpenPriceState);

  const [longAccount, setLongAccount] = useRecoilState(longAccountState);
  const [shortAccount, setShortAccount] = useRecoilState(shortAccountState);
  const longAccountDetail = useRecoilValue(longAccountDetailState);
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  const resetLongAccount = useResetRecoilState(longAccountState);
  const resetShortAccount = useResetRecoilState(shortAccountState);

  const [chartXDomain, setChartXDomain] = useState<DomainTuple>([
    new Date(2022, 0, 1),
    new Date(2022, 0, 15),
  ]);
  const [chartYDomain, setChartYDomain] = useState<DomainTuple>([
    INITIAL_CANDLE_LOW - CHART_Y_DOMAIN_PADDING,
    LAST_OF_INITIAL_CANDLE_HIGH + CHART_Y_DOMAIN_PADDING,
  ]);

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
      setLastOpenPrice(newCandleSet[0].open);
      for (let i = 0; i < newCandleSet.length; i++) {
        const newCandle = newCandleSet[i];
        timers.push(updateCandleData(newCandle, i, newCandleSet.length - 1));
      }

      return () => {
        timers.forEach((ele) => clearTimeout(ele));
      };
    }
  }, [turnNumber]);

  useEffect(() => {
    const targetCandles = candleData.slice(-CHART_X_DOMAIN_LENGTH);

    // x domain
    const startDate = targetCandles[0].x;
    const lastDate = new Date(startDate);
    lastDate.setDate(startDate.getDate() + CHART_X_DOMAIN_LENGTH);
    setChartXDomain([startDate, lastDate]);

    // y domain
    let lowestPrice = Number(chartYDomain[0]) + CHART_Y_DOMAIN_PADDING;
    let highestPrice = Number(chartYDomain[1]) - CHART_Y_DOMAIN_PADDING;

    targetCandles.forEach((ele) => {
      if (ele.low < lowestPrice) {
        lowestPrice = ele.low;
      }
      if (ele.high > highestPrice) {
        highestPrice = ele.high;
      }
    });

    setChartYDomain([
      lowestPrice - CHART_Y_DOMAIN_PADDING,
      highestPrice + CHART_Y_DOMAIN_PADDING,
    ]);
  }, [candleData]);

  return (
    <View>
      <VictoryChart
        domainPadding={{ x: 10 }}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) =>
              "     price :   " + `${round(datum.y, 1)}`
            }
          />
        }
      >
        <VictoryAxis
          dependentAxis
          style={{ grid: { stroke: "#b6b6b6", strokeWidth: 0.5 } }}
        />

        <VictoryCandlestick
          candleRatio={0.85}
          style={{
            data: {
              strokeWidth: 1,
              stroke: (d: any) => (d.close < d.open ? "#c43a31" : "#1759bb"),
            },
          }}
          candleColors={{ positive: "#c43a31", negative: "#1759bb" }}
          data={candleData}
          domain={{
            x: chartXDomain,
            y: chartYDomain,
          }}
        />
        <VictoryLine
          domain={{
            x: chartXDomain,
            y: chartYDomain,
          }}
          y={() => lastClosePrice}
          // labels={({ datum }) => "라인"}
          style={{
            data: {
              stroke: (d: any) =>
                lastClosePrice > lastOpenPrice ? "#c43a31" : "#1759bb",
              strokeWidth: 0.5,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
}

export default CandleChart;
