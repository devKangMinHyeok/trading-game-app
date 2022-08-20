import { CandlestickData } from "lightweight-charts";

export interface IChartComponent {
  processedData?: CandlestickData[];
  updatedCandle?: CandlestickData[];
  longLiquidPrice?: number;
  longPositionOpenPrice?: number;
  shortLiquidPrice?: number;
  shortPositionOpenPrice?: number;
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
}

export interface ITotalFutureAccount {
  positionActive: boolean;
  openPositionValue: number;
  currentPositionValue: number;
  unrealizedPnl: number;
  profitRate: number;
  totalAsset: number;
}

export interface ITotalAccount {
  cash: number;
  futureValuation: number;
  totalAsset: number;
  unrealizedPnl: number;
  profitRate: number;
}
