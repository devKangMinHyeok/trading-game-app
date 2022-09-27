import { atom, selector } from "recoil";
import {
  INITIAL_CANDLE_SET,
  INITIAL_CASH,
  INTEREST_DUE_PERIOD,
  INTEREST_RATE,
  LAST_OF_INITIAL_CANDLE_CLOSE,
  LAST_OF_INITIAL_CANDLE_HIGH,
  LAST_OF_INITIAL_CANDLE_LOW,
  LAST_OF_INITIAL_CANDLE_OPEN,
  LEVEL_SETTING,
  NEGATIVE,
  POSITIVE,
  ZERO,
} from "./globalConstant";
import {
  bangType,
  IFutureAccount,
  IFutureAccountDetail,
  ILevelInfo,
  ITotalAccount,
  ITotalFutureAccount,
} from "./interfaces/interface";

// UI 시스템

// 게임 시스템
export const candleDataState = atom({
  key: "candleDataState",
  default: INITIAL_CANDLE_SET,
});

export const turnNumberState = atom({
  key: "turnNumberState",
  default: 1,
});

export const interestTurnNumberState = selector({
  key: "interestTurnNumberState",
  get: ({ get }) => {
    const turnNumber = get(turnNumberState);
    return INTEREST_DUE_PERIOD - (turnNumber % INTEREST_DUE_PERIOD);
  },
});

export const loanTurnNumberState = selector({
  key: "loanTurnNumberState",
  get: ({ get }) => {
    const turnNumber = get(turnNumberState);
    const { limitTurn } = get(levelInfoState);
    return limitTurn - turnNumber;
  },
});

export const isLongControllerActiveState = atom({
  key: "isLongControllerActiveState",
  default: true,
});

export const isCandleMovingState = atom({
  key: "isCandleMovingState",
  default: false,
});

export const lastClosePriceState = atom({
  key: "lastClosePriceState",
  default: LAST_OF_INITIAL_CANDLE_CLOSE,
});

export const lastOpenPriceState = atom({
  key: "lastOpenPriceState",
  default: LAST_OF_INITIAL_CANDLE_OPEN,
});

export const lastHighPriceState = atom({
  key: "lastHighPriceState",
  default: LAST_OF_INITIAL_CANDLE_HIGH,
});

export const lastLowPriceState = atom({
  key: "lastLowPriceState",
  default: LAST_OF_INITIAL_CANDLE_LOW,
});

export const longLiquidState = atom({
  key: "longLiquidState",
  default: 0,
});

export const shortLiquidState = atom({
  key: "shortLiquidState",
  default: 0,
});

// 게좌 시스템

export const cashAccountState = atom({
  key: "accountState",
  default: INITIAL_CASH,
});

export const levelNumberState = atom({
  key: "levelNumberState",
  default: 1,
});

export const levelInfoState = selector({
  key: "levelInfoState",
  get: ({ get }) => {
    const levelNumber = get(levelNumberState);
    return LEVEL_SETTING[levelNumber - 1];
  },
});

export const interestPriceState = selector({
  key: "interestPriceState",
  get: ({ get }) => {
    const levelInfo = get(levelInfoState);
    return levelInfo.loan * INTEREST_RATE;
  },
});

export const loanInfoState = selector({
  key: "loanInfoState",
  get: ({ get }) => {
    const interestTurnNumber = get(interestTurnNumberState);
    const loanTurnNumber = get(loanTurnNumberState);
    const cashAccount = get(cashAccountState);
    const interestPrice = get(interestPriceState);
    const { loan: loanPrice, transactionFeeRate } = get(levelInfoState);
    const futureActive = get(futureActiveState);
    const totalFutureAccount = get(totalFutureAccountState);

    const cashInterestRemain = cashAccount - interestPrice;
    const futureInterestFee =
      interestPrice * (1 + (transactionFeeRate * futureActive.leverage) / 100);
    const futureInterestRemain =
      totalFutureAccount.totalAsset - futureInterestFee;

    return {
      interest: {
        payAble: cashInterestRemain >= 0 || futureInterestRemain >= 0,
        cashAble: cashInterestRemain >= 0,
        futureAble: futureInterestRemain >= 0,
        interestTurnNumber,
        cashRemain: cashInterestRemain,
        futurePayFee: futureInterestFee,
      },
    };
  },
});

export const longAccountState = atom({
  key: "longAccountState",
  default: {
    positionActive: false,
    openPrice: 0,
    liquidPrice: 0,
    leverage: 1,
    openPositionAmount: 0,
    openPositionValue: 0,
    currentPositionValue: 0,
  } as IFutureAccount,
});

export const shortAccountState = atom({
  key: "shortAccountState",
  default: {
    positionActive: false,
    openPrice: 0,
    liquidPrice: 0,
    leverage: 1,
    openPositionAmount: 0,
    openPositionValue: 0,
    currentPositionValue: 0,
  } as IFutureAccount,
});

export const futureActiveState = selector({
  key: "futureActiveState",
  get: ({ get }) => {
    const { positionActive: isLongActive, leverage: longLeverage } =
      get(longAccountState);
    const { positionActive: isShortActive, leverage: shortLeverage } =
      get(shortAccountState);
    const futureActive = isLongActive || isShortActive;
    const leverage = futureActive
      ? isLongActive
        ? longLeverage
        : shortLeverage
      : 1;
    return {
      futureActive,
      isLongActive,
      isShortActive,
      leverage,
    };
  },
});

export const longAccountDetailState = selector({
  key: "longAccountDetailState",
  get: ({ get }) => {
    const longAccount = get(longAccountState);
    const unrealizedPnl =
      longAccount.leverage *
      (longAccount.currentPositionValue - longAccount.openPositionValue);
    return {
      positionActive: longAccount.positionActive,
      openPrice: longAccount.openPrice,
      liquidPrice: longAccount.liquidPrice,
      leverage: longAccount.leverage,
      openPositionAmount: longAccount.openPositionAmount,
      openPositionValue: longAccount.openPositionValue,
      currentPositionValue: longAccount.currentPositionValue,
      unrealizedPnl,
      profitRate: unrealizedPnl / longAccount.openPositionValue,
      totalAsset: unrealizedPnl + longAccount.openPositionValue,
      isPositive:
        unrealizedPnl > 0 ? POSITIVE : unrealizedPnl < 0 ? NEGATIVE : ZERO,
    } as IFutureAccountDetail;
  },
});

export const shortAccountDetailState = selector({
  key: "shortAccountDetailState",
  get: ({ get }) => {
    const shortAccount = get(shortAccountState);
    const unrealizedPnl =
      shortAccount.leverage *
      (shortAccount.openPositionValue - shortAccount.currentPositionValue);
    return {
      positionActive: shortAccount.positionActive,
      openPrice: shortAccount.openPrice,
      liquidPrice: shortAccount.liquidPrice,
      leverage: shortAccount.leverage,
      openPositionAmount: shortAccount.openPositionAmount,
      openPositionValue: shortAccount.openPositionValue,
      currentPositionValue: shortAccount.currentPositionValue,
      unrealizedPnl,
      profitRate: unrealizedPnl / shortAccount.openPositionValue,
      totalAsset: unrealizedPnl + shortAccount.openPositionValue,
      isPositive:
        unrealizedPnl > 0 ? POSITIVE : unrealizedPnl < 0 ? NEGATIVE : ZERO,
    } as IFutureAccountDetail;
  },
});

export const totalFutureAccountState = selector({
  key: "futureAccountState",
  get: ({ get }) => {
    const longAccountDetail = get(longAccountDetailState);
    const shortAccountDetail = get(shortAccountDetailState);

    const openPositionValue =
      longAccountDetail.openPositionValue +
      shortAccountDetail.openPositionValue;
    const currentPositionValue =
      longAccountDetail.currentPositionValue +
      shortAccountDetail.currentPositionValue;
    const unrealizedPnl =
      longAccountDetail.unrealizedPnl + shortAccountDetail.unrealizedPnl;

    return {
      positionActive:
        longAccountDetail.positionActive || shortAccountDetail.positionActive,
      openPositionValue,
      currentPositionValue,
      unrealizedPnl,
      profitRate: unrealizedPnl / openPositionValue,
      totalAsset: unrealizedPnl + openPositionValue,
      isPositive:
        unrealizedPnl > 0 ? POSITIVE : unrealizedPnl < 0 ? NEGATIVE : ZERO,
    } as ITotalFutureAccount;
  },
});

export const totalAccountState = selector({
  key: "totalAccountState",
  get: ({ get }) => {
    const cashAccount = get(cashAccountState);
    const futureAccount = get(totalFutureAccountState);

    const openValuation = futureAccount.openPositionValue + cashAccount;
    const totalAsset = cashAccount + futureAccount.totalAsset;
    const unrealizedPnl = totalAsset - openValuation;
    const realizedPnl = totalAsset - INITIAL_CASH;
    return {
      cash: cashAccount,
      futureValuation: futureAccount.totalAsset,
      totalAsset,
      unrealizedPnl,
      profitRate: unrealizedPnl / openValuation,
      isPositive:
        realizedPnl > 0 ? POSITIVE : realizedPnl < 0 ? NEGATIVE : ZERO,
    } as ITotalAccount;
  },
});
