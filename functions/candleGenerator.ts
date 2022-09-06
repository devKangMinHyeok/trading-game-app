import { cloneDeep, random } from "lodash";
import { ICandleStick } from "../interfaces/interface";
import getRandomRate from "./getRandomRate";

const candleGenerator = (
  time: Date,
  lastClosePrice: number,
  numberPerUnit: number,
  random_gap: number = 0.05
) => {
  let previousCandle: ICandleStick = {
    x: time,
    open: lastClosePrice,
    high: lastClosePrice,
    low: lastClosePrice,
    close: lastClosePrice,
  };
  const candleSet = [previousCandle];

  for (let i = 0; i < numberPerUnit; i++) {
    const newCandle = cloneDeep(previousCandle);

    // const newClose =
    //   newCandle.close * random(1 - random_gap, 1 + random_gap, true);
    const newClose =
      newCandle.close * getRandomRate(1, 1, 1 - random_gap, 1 + random_gap);
    const newHigh = newCandle.high < newClose ? newClose : newCandle.high;
    const newLow = newCandle.low > newClose ? newClose : newCandle.low;

    newCandle.close = newClose;
    newCandle.high = newHigh;
    newCandle.low = newLow;

    previousCandle = newCandle;
    candleSet.push(newCandle);
  }

  return candleSet;
};

export default candleGenerator;
