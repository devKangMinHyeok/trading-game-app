import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { VictoryAxis, VictoryCandlestick, VictoryChart } from "victory-native";
import {
  candleDataState,
  isCandleMovingState,
  turnNumberState,
} from "../../atom";
import candleGenerator from "../../functions/candleGenerator";
import {
  CANDLE_MOVING_UNIT_MS,
  INITIAL_CANDLE_SET,
  SPLIT_UNIT_OF_CANDLE,
} from "../../globalConstant";
import { ICandleStick } from "../../interfaces/interface";

function CandleChart() {
  const turnNumber = useRecoilValue(turnNumberState);
  const [candleData, setCandleData] = useRecoilState(candleDataState);
  const [isCandleMoving, setIsCandleMoving] =
    useRecoilState(isCandleMovingState);

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
    <ScrollView>
      <VictoryChart domainPadding={{ x: 70 }}>
        <VictoryAxis dependentAxis />
        <VictoryCandlestick
          candleColors={{ positive: "#c43a31", negative: "#316cc4" }}
          data={candleData}
        />
      </VictoryChart>
    </ScrollView>
  );
}

export default CandleChart;
