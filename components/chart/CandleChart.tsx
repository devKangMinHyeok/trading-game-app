import { cloneDeep, round } from "lodash";
import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { DomainTuple } from "victory-core";
import {
  createContainer,
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
  longLiquidState,
  shortAccountDetailState,
  shortAccountState,
  shortLiquidState,
  turnNumberState,
} from "../../atom";
import calDate from "../../functions/calDate";
import candleGenerator from "../../functions/candleGenerator";
import {
  CANDLE_MOVING_UNIT_MS,
  CHART_X_DOMAIN_LENGTH,
  CHART_Y_DOMAIN_PADDING,
  INITIAL_CANDLE_LOW,
  LABEL_GAP_OF_LINE,
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

  const [longLiquid, setLongLiquid] = useRecoilState(longLiquidState);
  const [shortLiquid, setShortLiquid] = useRecoilState(shortLiquidState);

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
        const newData = [...prev];
        if (newData.slice(-1)[0].x.toString() == newCandle.x.toString()) {
          newData[newData.length - 1] = newCandle;
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
      const nextDate = calDate(new Date(lastDate), 1);
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
        width={Dimensions.get("window").width}
        domainPadding={{ x: 35 }}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) =>
              "     price :   " + `${round(datum.y, 1)}`
            }
          />
        }
        style={{
          parent: {
            backgroundColor: "transparent",
          },
          background: {
            fill: "transparent",
          },
        }}
      >
        <VictoryAxis
          dependentAxis
          offsetX={50}
          orientation="right"
          style={{ grid: { stroke: "#b6b6b6", strokeWidth: 0.5 } }}
        />
        <VictoryCandlestick
          candleWidth={12}
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

        {/* 현재가 Line */}
        <VictoryLine
          domain={{
            x: chartXDomain,
            y: chartYDomain,
          }}
          y={() => lastClosePrice}
          style={{
            data: {
              stroke: (d: any) =>
                lastClosePrice > lastOpenPrice ? "#c43a31" : "#1759bb",
              strokeWidth: 1,
              strokeDasharray: 1,
            },
          }}
        />

        {/* Long 청산가 */}
        {longAccountDetail.positionActive ? (
          <VictoryLabel
            text="청산가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: longAccountDetail.liquidPrice,
            }}
            textAnchor="end"
            style={{ fontSize: 9 }}
          />
        ) : (
          <VictoryLabel
            text="청산가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: longLiquid,
            }}
            textAnchor="end"
            style={{ fontSize: 9 }}
          />
        )}
        {longAccountDetail.positionActive ? (
          <VictoryLine
            domain={{
              x: chartXDomain,
              y: chartYDomain,
            }}
            y={() => longAccountDetail.liquidPrice}
            style={{
              data: {
                stroke: "#008496",
                strokeWidth: 1.5,
              },
            }}
          />
        ) : (
          <VictoryLine
            domain={{
              x: chartXDomain,
              y: chartYDomain,
            }}
            y={() => longLiquid}
            style={{
              data: {
                stroke: "#40ca00",
                strokeWidth: 1.5,
              },
            }}
          />
        )}

        {/* Short 청산가 */}
        {shortAccountDetail.positionActive ? (
          <VictoryLabel
            text="청산가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: shortAccountDetail.liquidPrice,
            }}
            textAnchor="end"
            style={{ fontSize: 9 }}
          />
        ) : (
          <VictoryLabel
            text="청산가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: shortLiquid,
            }}
            textAnchor="end"
            style={{ fontSize: 9 }}
          />
        )}
        {shortAccountDetail.positionActive ? (
          <VictoryLine
            domain={{
              x: chartXDomain,
              y: chartYDomain,
            }}
            y={() => shortAccountDetail.liquidPrice}
            style={{
              data: {
                stroke: "#890096",
                strokeWidth: 1.5,
              },
            }}
          />
        ) : (
          <VictoryLine
            domain={{
              x: chartXDomain,
              y: chartYDomain,
            }}
            y={() => shortLiquid}
            style={{
              data: {
                stroke: "#890096",
                strokeWidth: 1.5,
              },
            }}
          />
        )}

        {/* Long 평단가 */}
        {longAccountDetail.positionActive ? (
          <VictoryLabel
            text="평단가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: longAccountDetail.openPrice,
            }}
            textAnchor="end"
            style={{ fontSize: 9 }}
          />
        ) : null}
        {longAccountDetail.positionActive ? (
          <VictoryLine
            domain={{
              x: chartXDomain,
              y: chartYDomain,
            }}
            y={() => longAccountDetail.openPrice}
            style={{
              data: {
                stroke: "#40ca00",
                strokeWidth: 1,
                strokeDasharray: 1.5,
              },
            }}
          />
        ) : null}

        {/* Short 평단가 */}
        {shortAccountDetail.positionActive ? (
          <VictoryLabel
            text="평단가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: shortAccountDetail.openPrice,
            }}
            textAnchor="end"
            style={{ fontSize: 9 }}
          />
        ) : null}
        {shortAccountDetail.positionActive ? (
          <VictoryLine
            domain={{
              x: chartXDomain,
              y: chartYDomain,
            }}
            y={() => shortAccountDetail.openPrice}
            style={{
              data: {
                stroke: "#fc852a",
                strokeWidth: 0.5,
                strokeDasharray: 1.5,
              },
            }}
          />
        ) : null}
      </VictoryChart>
    </View>
  );
}

export default CandleChart;
