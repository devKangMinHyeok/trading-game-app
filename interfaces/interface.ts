export interface ICandleStick {
  x: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}

export type levelNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type levelNameType =
  | "입문자"
  | "코린이"
  | "초보자"
  | "중급자"
  | "전문가"
  | "예언자"
  | "신";

export type levelRandomGap = 0.04 | 0.05 | 0.06 | 0.07 | 0.08 | 0.09 | 0.1;

export type transactionFeeRate = 0.04 | 0.06 | 0.08 | 0.1 | 0.12 | 0.2 | 0.35;

export interface ILevelInfo {
  levelNumber: levelNumberType;
  levelName: levelNameType;
  randomGap: levelRandomGap;
  stddev: number;
  transactionFeeRate: transactionFeeRate;
  color: string;
}

export interface IFutureAccount {
  positionActive: boolean;
  openPrice: number;
  liquidPrice: number;
  leverage: number;
  openPositionAmount: number;
  openPositionValue: number;
  currentPositionValue: number;
}

export interface IFutureAccountDetail {
  positionActive: boolean;
  openPrice: number;
  liquidPrice: number;
  leverage: number;
  openPositionAmount: number;
  openPositionValue: number;
  currentPositionValue: number;
  unrealizedPnl: number;
  profitRate: number;
  totalAsset: number;
  isPositive: string;
}

export interface ITotalFutureAccount {
  positionActive: boolean;
  openPositionValue: number;
  currentPositionValue: number;
  unrealizedPnl: number;
  profitRate: number;
  totalAsset: number;
  isPositive: string;
}

export interface ITotalAccount {
  cash: number;
  futureValuation: number;
  totalAsset: number;
  unrealizedPnl: number;
  profitRate: number;
  isPositive: string;
}
