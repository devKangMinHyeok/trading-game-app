import { ICandleStick } from "./interfaces/interface";

// Chart
export const SPLIT_UNIT_OF_CANDLE = 20;
export const CANDLE_MOVING_UNIT_MS = 200;
export const INITIAL_CANDLE_OPEN = 100;
export const INITIAL_CANDLE_CLOSE = 110;
export const INITIAL_CANDLE_HIGH = 120;
export const INITIAL_CANDLE_LOW = 90;
export const LAST_OF_INITIAL_CANDLE_OPEN = 160;
export const LAST_OF_INITIAL_CANDLE_CLOSE = 150;
export const LAST_OF_INITIAL_CANDLE_HIGH = 170;
export const LAST_OF_INITIAL_CANDLE_LOW = 140;
export const CHART_X_DOMAIN_LENGTH = 15;
export const CHART_Y_DOMAIN_PADDING = 15;

// Account
export const INITIAL_CASH = 1000000;
export const TRANSACTION_FEE_RATE = 0.04;

// Leverage
export const INIT_LEVERAGE = 1;
export const LEVERAGE_MIN = 1;
export const LEVERAGE_MAX = 50;

export const LEVERAGE_UNITS = [
  { label: "x1", value: 1 },
  { label: "x2", value: 2 },
  { label: "x3", value: 3 },
  { label: "x5", value: 5 },
  { label: "x10", value: 10 },
  { label: "x25", value: 25 },
  { label: "x50", value: 50 },
];
export const INITIAL_CANDLE_SET: ICandleStick[] = [
  {
    x: new Date(2022, 0, 1),
    open: INITIAL_CANDLE_OPEN,
    close: INITIAL_CANDLE_CLOSE,
    high: INITIAL_CANDLE_HIGH,
    low: INITIAL_CANDLE_LOW,
  },
  { x: new Date(2022, 0, 2), open: 110, close: 130, high: 130, low: 100 },
  { x: new Date(2022, 0, 3), open: 130, close: 100, high: 140, low: 90 },
  { x: new Date(2022, 0, 4), open: 100, close: 125, high: 150, low: 100 },
  { x: new Date(2022, 0, 5), open: 125, close: 150, high: 170, low: 120 },
  { x: new Date(2022, 0, 6), open: 150, close: 130, high: 160, low: 120 },
  { x: new Date(2022, 0, 7), open: 130, close: 180, high: 200, low: 100 },
  { x: new Date(2022, 0, 8), open: 180, close: 200, high: 200, low: 160 },
  { x: new Date(2022, 0, 9), open: 200, close: 160, high: 210, low: 150 },
  { x: new Date(2022, 0, 10), open: 160, close: 150, high: 200, low: 150 },
  { x: new Date(2022, 0, 11), open: 150, close: 120, high: 160, low: 110 },
  { x: new Date(2022, 0, 12), open: 120, close: 130, high: 140, low: 110 },
  { x: new Date(2022, 0, 13), open: 130, close: 160, high: 180, low: 130 },
  {
    x: new Date(2022, 0, 14),
    open: 160,
    close: LAST_OF_INITIAL_CANDLE_OPEN,
    high: 200,
    low: 150,
  },
  {
    x: new Date(2022, 0, 15),
    open: LAST_OF_INITIAL_CANDLE_OPEN,
    close: LAST_OF_INITIAL_CANDLE_CLOSE,
    high: LAST_OF_INITIAL_CANDLE_HIGH,
    low: LAST_OF_INITIAL_CANDLE_LOW,
  },
];
