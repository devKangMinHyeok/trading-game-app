import { ICandleStick } from "./interfaces/interface";

export const INITIAL_CASH = 1000000;
export const SPLIT_UNIT_OF_CANDLE = 40;
export const CANDLE_MOVING_UNIT_MS = 100;
export const TRANSACTION_FEE_RATE = 0.04;
export const INIT_LEVERAGE = 1;
export const LEVERAGE_MIN = 1;
export const LEVERAGE_MAX = 50;
export const LEVERAGE_UNITS = [1, 2, 3, 5, 10, 25, 50];
export const INITIAL_CANDLE_OPEN = 100;
export const INITIAL_CANDLE_CLOSE = 110;
export const INITIAL_CANDLE_HIGH = 120;
export const INITIAL_CANDLE_LOW = 90;

export const INITIAL_CANDLE_SET: ICandleStick[] = [
  { x: new Date(2022, 0, 1), open: 100, close: 110, high: 120, low: 90 },
  { x: new Date(2022, 0, 2), open: 110, close: 130, high: 130, low: 100 },
  { x: new Date(2022, 0, 3), open: 130, close: 100, high: 140, low: 90 },
  { x: new Date(2022, 0, 4), open: 100, close: 125, high: 150, low: 100 },
  { x: new Date(2022, 0, 5), open: 125, close: 150, high: 170, low: 120 },
  { x: new Date(2022, 0, 6), open: 150, close: 130, high: 160, low: 120 },
  { x: new Date(2022, 0, 7), open: 130, close: 180, high: 200, low: 100 },
  { x: new Date(2022, 0, 8), open: 180, close: 200, high: 200, low: 160 },
  { x: new Date(2022, 0, 9), open: 200, close: 160, high: 210, low: 150 },
  { x: new Date(2022, 0, 10), open: 160, close: 150, high: 170, low: 140 },
];
