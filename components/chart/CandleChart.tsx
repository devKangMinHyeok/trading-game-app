import { cloneDeep, round } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { DomainTuple } from "victory-core";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryCursorContainer,
  VictoryLine,
  VictoryLabel,
  Line,
} from "victory-native";
import {
  bangTriggerState,
  candleDataState,
  isCandleMovingState,
  lastClosePriceState,
  lastOpenPriceState,
  levelInfoState,
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
  CANDLE_WIDTH,
  CHART_X_DOMAIN_LENGTH,
  CHART_Y_DOMAIN_PADDING,
  DOMAIN_PADDING,
  INITIAL_CANDLE_LOW,
  LABEL_GAP_OF_LINE,
  LAST_OF_INITIAL_CANDLE_HIGH,
  LEFT_LABEL_FONT_SIZE,
  LIQUID_PRICE_STROKE_WIDTH,
  OPEN_PRICE_STROKE_DASH_ARRAY,
  OPEN_PRICE_STROKE_WIDTH,
  SPLIT_UNIT_OF_CANDLE,
  TRADE_PRICE_STROKE_DASH_ARRAY,
  TRADE_PRICE_STROKE_WIDTH,
} from "../../globalConstant";
import { ICandleStick } from "../../interfaces/interface";
import { sharedLabelStyle } from "../../styles/chartStyles";
import { SCREEN_WIDTH } from "../../styles/rootStyles";
import theme from "../../styles/theme";

function CandleChart() {
  const bangTrigger = useRecoilValue(bangTriggerState);
  const turnNumber = useRecoilValue(turnNumberState);
  const levelInfo = useRecoilValue(levelInfoState);
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

  const updateCandleData = useCallback(
    (newCandle: ICandleStick, index: number, lastIndex: number) => {
      return setTimeout(() => {
        setCandleData((prev) => {
          const newData = [...prev];
          if (newData.slice(-1)[0].x.toString() == newCandle.x.toString()) {
            newData[newData.length - 1] = newCandle;
          } else {
            newData.push(newCandle);
            if (newData.length > CHART_X_DOMAIN_LENGTH) newData.shift();
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
    },
    [longAccountDetail, shortAccountDetail]
  );

  useEffect(() => {
    if (turnNumber > 1 && !bangTrigger.bang) {
      const timers: NodeJS.Timeout[] = [];
      const lastDate = candleData.slice(-1)[0].x;
      const nextDate = calDate(new Date(lastDate), 1);
      const lastPrice = candleData.slice(-1)[0].close;
      const newCandleSet = candleGenerator(
        nextDate,
        lastPrice,
        SPLIT_UNIT_OF_CANDLE,
        levelInfo.randomGap,
        levelInfo.stddev
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
    let lowestPrice = 10000000000;
    let highestPrice = 0;

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
        width={SCREEN_WIDTH}
        domainPadding={{ x: DOMAIN_PADDING }}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) => "            " + `${round(datum.y, 1)}`}
            cursorComponent={
              <Line
                style={{
                  stroke: theme.colors.crossHairLineColor,
                  strokeWidth: 1,
                }}
              />
            }
            cursorLabelComponent={
              <VictoryLabel
                style={{
                  fill: theme.colors.baseTextColor,
                  fontSize: theme.font.smallValueFontSize,
                }}
              />
            }
          />
        }
        style={{
          parent: {
            backgroundColor: "transparent",
          },
          background: {
            fill: theme.colors.backgroundColor1,
          },
        }}
      >
        <VictoryAxis
          dependentAxis
          offsetX={50}
          orientation="right"
          style={{
            grid: { stroke: "#b6b6b6", strokeWidth: 0.5 },
            tickLabels: {
              fill: theme.colors.baseTextColor,
              fontSize: 14,
            },
          }}
        />
        <VictoryCandlestick
          candleWidth={CANDLE_WIDTH}
          style={{
            data: {
              strokeWidth: 1,
              stroke: (d: any) =>
                d.close < d.open
                  ? theme.colors.longCandleColor
                  : theme.colors.shortCandleColor,
            },
          }}
          candleColors={{
            positive: theme.colors.longCandleColor,
            negative: theme.colors.shortCandleColor,
          }}
          data={candleData}
          domain={{
            x: chartXDomain,
            y: chartYDomain,
          }}
        />

        {/* 현재가 Line */}
        <VictoryLabel
          text={lastClosePrice.toFixed(1)}
          datum={{
            x: calDate(new Date(chartXDomain[1]), 4),
            y: lastClosePrice + 5,
          }}
          textAnchor="end"
          style={sharedLabelStyle}
          backgroundPadding={[{ left: 5, right: 3, top: 3, bottom: 3 }]}
          backgroundStyle={[
            {
              fill:
                lastClosePrice > lastOpenPrice
                  ? theme.colors.longCandleColor
                  : theme.colors.shortCandleColor,
              opacity: 0.98,
            },
          ]}
        />
        <VictoryLine
          domain={{
            x: chartXDomain,
            y: chartYDomain,
          }}
          y={() => lastClosePrice}
          style={{
            data: {
              stroke: (d: any) =>
                lastClosePrice > lastOpenPrice
                  ? theme.colors.longCandleColor
                  : theme.colors.shortCandleColor,
              strokeWidth: TRADE_PRICE_STROKE_WIDTH,
              strokeDasharray: TRADE_PRICE_STROKE_DASH_ARRAY,
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
            style={sharedLabelStyle}
          />
        ) : (
          <VictoryLabel
            text="청산가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: longLiquid,
            }}
            textAnchor="end"
            style={sharedLabelStyle}
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
                stroke: theme.colors.longLiquidActiveLineColor,
                strokeWidth: LIQUID_PRICE_STROKE_WIDTH,
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
                stroke: theme.colors.longLiquidInactiveLineColor,
                strokeWidth: LIQUID_PRICE_STROKE_WIDTH,
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
            style={sharedLabelStyle}
          />
        ) : (
          <VictoryLabel
            text="청산가"
            datum={{
              x: calDate(new Date(chartXDomain[0]), -LABEL_GAP_OF_LINE),
              y: shortLiquid,
            }}
            textAnchor="end"
            style={sharedLabelStyle}
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
                stroke: theme.colors.shortLiquidActiveLineColor,
                strokeWidth: LIQUID_PRICE_STROKE_WIDTH,
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
                stroke: theme.colors.shortLiquidInactiveLineColor,
                strokeWidth: LIQUID_PRICE_STROKE_WIDTH,
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
            style={sharedLabelStyle}
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
                stroke: theme.colors.openPriceLineColor,
                strokeWidth: OPEN_PRICE_STROKE_WIDTH,
                strokeDasharray: OPEN_PRICE_STROKE_DASH_ARRAY,
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
            style={sharedLabelStyle}
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
                stroke: theme.colors.openPriceLineColor,
                strokeWidth: OPEN_PRICE_STROKE_WIDTH,
                strokeDasharray: OPEN_PRICE_STROKE_DASH_ARRAY,
              },
            }}
          />
        ) : null}
      </VictoryChart>
    </View>
  );
}

export default CandleChart;
