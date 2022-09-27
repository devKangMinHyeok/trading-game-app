import { ICandleStick, ILevelInfo } from "./interfaces/interface";

// Chart Style
export const LABEL_GAP_OF_LINE = 2;
export const DOMAIN_PADDING = 15;
export const CANDLE_WIDTH = 8;

export const CHART_X_DOMAIN_LENGTH = 25;
export const CHART_Y_DOMAIN_PADDING = 15;

export const TRADE_PRICE_STROKE_WIDTH = 1.5;
export const TRADE_PRICE_STROKE_DASH_ARRAY = 1;

export const LIQUID_PRICE_STROKE_WIDTH = 1.5;

export const OPEN_PRICE_STROKE_WIDTH = 1.5;
export const OPEN_PRICE_STROKE_DASH_ARRAY = 1.5;

export const LEFT_LABEL_FONT_SIZE = 9;

// Chart System
export const SPLIT_UNIT_OF_CANDLE = 20;
export const CANDLE_MOVING_UNIT_MS = 200;

export const INITIAL_CANDLE_OPEN = 100;
export const INITIAL_CANDLE_CLOSE = 110;
export const INITIAL_CANDLE_HIGH = 120;
export const INITIAL_CANDLE_LOW = 90;

export const LAST_OF_INITIAL_CANDLE_OPEN = 180;
export const LAST_OF_INITIAL_CANDLE_CLOSE = 150;
export const LAST_OF_INITIAL_CANDLE_HIGH = 180;
export const LAST_OF_INITIAL_CANDLE_LOW = 140;

export const CANDLE_INITIAL_DATE = new Date(2022, 0, 1);

// Account
export const INITIAL_CASH = 1000000;

export const POSITIVE = "positive";
export const NEGATIVE = "negative";
export const ZERO = "zero";

export const INTEREST_DUE_PERIOD = 10;
export const INTEREST_RATE = 0.0001;
export const LEVEL_SETTING: ILevelInfo[] = [
  {
    levelNumber: 1,
    levelName: "입문자",
    randomGap: 0.04,
    stddev: 1,
    transactionFeeRate: 0.04,
    color: "#ead600",
    loan: 2000000,
    limitTurn: 50,
  },
  {
    levelNumber: 2,
    levelName: "코린이",
    randomGap: 0.05,
    stddev: 2,
    transactionFeeRate: 0.06,
    color: "#ff7e2e",
    loan: 5000000,
    limitTurn: 100,
  },
  {
    levelNumber: 3,
    levelName: "초보자",
    randomGap: 0.06,
    stddev: 3,
    transactionFeeRate: 0.08,
    color: "#00dfb2",
    loan: 10000000,
    limitTurn: 300,
  },
  {
    levelNumber: 4,
    levelName: "중급자",
    randomGap: 0.07,
    stddev: 4,
    transactionFeeRate: 0.1,
    color: "#043efa",
    loan: 100000000,
    limitTurn: 500,
  },
  {
    levelNumber: 5,
    levelName: "전문가",
    randomGap: 0.08,
    stddev: 5,
    transactionFeeRate: 0.12,
    color: "#ad00dd",
    loan: 1000000000,
    limitTurn: 1000,
  },
  {
    levelNumber: 6,
    levelName: "예언자",
    randomGap: 0.09,
    stddev: 6,
    transactionFeeRate: 0.2,
    color: "#ff0099",
    loan: 5000000000,
    limitTurn: 1000,
  },
  {
    levelNumber: 7,
    levelName: "신",
    randomGap: 0.1,
    stddev: 7,
    transactionFeeRate: 0.35,
    color: "#ffffff",
    loan: 10000000000,
    limitTurn: 1000,
  },
];

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
    x: CANDLE_INITIAL_DATE,
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
