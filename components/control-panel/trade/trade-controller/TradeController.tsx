import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cashAccountState,
  isCandleMovingState,
  isLongControllerActiveState,
  lastClosePriceState,
  longAccountDetailState,
  longAccountState,
  longLiquidState,
  shortAccountDetailState,
  shortAccountState,
  shortLiquidState,
} from "../../../../atom";
import { TRANSACTION_FEE_RATE } from "../../../../globalConstant";
import useComponentSize from "../../../../hooks/useComponentSize";
import AmountSettingBox from "./components/AmountSettingBox";

import LeverageControlBox from "./components/LeverageControlBox";
import LiquidPriceBox from "./components/LiquidPriceBox";
import TotalPriceBox from "./components/TotalPriceBox";
import TradeButton from "./components/TradeButton";

function TradeController({
  disabled,
  activeLeverage,
}: {
  disabled: boolean;
  activeLeverage?: number;
}) {
  // Account System
  const [cashAccount, setCashAccount] = useRecoilState(cashAccountState);
  const [longLiquid, setLongLiquid] = useRecoilState(longLiquidState);
  const [shortLiquid, setShortLiquid] = useRecoilState(shortLiquidState);
  const lastClosePrice = useRecoilValue(lastClosePriceState);
  const [longAccount, setLongAccount] = useRecoilState(longAccountState);
  const [shortAccount, setShortAccount] = useRecoilState(shortAccountState);
  const longAccountDetail = useRecoilValue(longAccountDetailState);
  const shortAccountDetail = useRecoilValue(shortAccountDetailState);
  // UI System
  const isCandleMoving = useRecoilValue(isCandleMovingState);
  const isLongSelected = useRecoilValue(isLongControllerActiveState);

  const [leverage, setLeverage] = useState(1);
  const [amountRate, setAmountRate] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coinAmount, setCoinAmount] = useState(0);

  const { size, onLayout } = useComponentSize();

  const buyButtonHandler = useCallback(() => {
    if (isLongSelected) {
      if (!isCandleMoving) {
        setCashAccount((prev) => prev - totalPrice);
        if (shortAccountDetail.positionActive) {
          alert("Long 포지션과 Short 포지션을 동시에 보유할 수 없습니다.");
        } else if (!longAccountDetail.positionActive && coinAmount > 0) {
          const newLongAccount = {
            positionActive: true,
            openPrice: lastClosePrice,
            liquidPrice: longLiquid,
            leverage: leverage,
            openPositionValue: lastClosePrice * coinAmount,
            openPositionAmount: coinAmount,
            currentPositionValue: lastClosePrice * coinAmount,
          };
          setLongAccount(newLongAccount);
        } else if (longAccountDetail.positionActive && coinAmount > 0) {
          setLongAccount((prev) => {
            const newLog = cloneDeep(prev);
            const newOpenPositionValue = lastClosePrice * coinAmount;
            newLog.openPrice =
              (newLog.openPrice * newLog.openPositionAmount +
                newOpenPositionValue) /
              (newLog.openPositionAmount + coinAmount);

            newLog.openPositionAmount = newLog.openPositionAmount + coinAmount;

            newLog.openPositionValue =
              newLog.openPositionValue + newOpenPositionValue;

            newLog.currentPositionValue =
              newLog.currentPositionValue + newOpenPositionValue;

            newLog.liquidPrice = newLog.openPrice * (1 - 1 / newLog.leverage);
            return newLog;
          });
        } else if (coinAmount === 0) {
          alert("0개는 주문할 수 없습니다.");
        }
        setAmountRate(0);
      }
    }
  }, [
    isLongSelected,
    isCandleMoving,
    longAccountDetail,
    totalPrice,
    coinAmount,
  ]);

  const sellButtonHandler = useCallback(() => {
    if (!isLongSelected) {
      if (!isCandleMoving) {
        setCashAccount((prev) => prev - totalPrice);
        if (longAccountDetail.positionActive) {
          alert("Long 포지션과 Short 포지션을 동시에 보유할 수 없습니다.");
        } else if (!shortAccountDetail.positionActive && coinAmount > 0) {
          const newShortAccount = {
            positionActive: true,
            openPrice: lastClosePrice,
            liquidPrice: shortLiquid,
            leverage: leverage,
            openPositionValue: lastClosePrice * coinAmount,
            openPositionAmount: coinAmount,
            currentPositionValue: lastClosePrice * coinAmount,
          };
          setShortAccount(newShortAccount);
        } else if (shortAccountDetail.positionActive && coinAmount > 0) {
          setShortAccount((prev) => {
            const newLog = cloneDeep(prev);
            const newOpenPositionValue = lastClosePrice * coinAmount;
            newLog.openPrice =
              (newLog.openPrice * newLog.openPositionAmount +
                newOpenPositionValue) /
              (newLog.openPositionAmount + coinAmount);

            newLog.openPositionAmount = newLog.openPositionAmount + coinAmount;

            newLog.openPositionValue =
              newLog.openPositionValue + newOpenPositionValue;

            newLog.currentPositionValue =
              newLog.currentPositionValue + newOpenPositionValue;

            newLog.liquidPrice = newLog.openPrice * (1 + 1 / newLog.leverage);
            return newLog;
          });
        } else if (coinAmount === 0) {
          alert("0개는 주문할 수 없습니다.");
        }
        setAmountRate(0);
      }
    }
  }, [
    isLongSelected,
    isCandleMoving,
    shortAccountDetail,
    totalPrice,
    coinAmount,
  ]);

  useEffect(() => {
    const targetCash = (cashAccount * amountRate) / 100;
    const ableCoinAmount = Math.floor(
      targetCash /
        (lastClosePrice * (1 + (TRANSACTION_FEE_RATE / 100) * leverage))
    );
    setCoinAmount(ableCoinAmount);
  }, [amountRate, leverage]);

  useEffect(() => {
    setTotalPrice(
      lastClosePrice *
        coinAmount *
        (1 + (TRANSACTION_FEE_RATE / 100) * leverage)
    );
  }, [lastClosePrice, coinAmount]);

  useEffect(() => {
    if (isCandleMoving) {
      setLongLiquid(0);
      setShortLiquid(0);
    } else {
      if (isLongSelected) {
        setLongLiquid(lastClosePrice * (1 - 1 / leverage));
      } else {
        setShortLiquid(lastClosePrice * (1 + 1 / leverage));
      }
    }
    return () => {
      setLongLiquid(0);
      setShortLiquid(0);
    };
  }, [lastClosePrice, leverage, isCandleMoving, isLongSelected]);

  useEffect(() => {
    if (isCandleMoving) {
      setAmountRate(0);
    }
  }, [isCandleMoving]);

  return (
    <View style={{ height: "100%", width: "100%" }} onLayout={onLayout}>
      <View style={{ flex: 1.2 }}>
        <LeverageControlBox
          isLongSelected={isLongSelected}
          activeLeverage={activeLeverage}
          leverage={leverage}
          setLeverage={setLeverage}
          disabled={disabled}
        />
      </View>
      <View
        style={{
          flex: 1.5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 2.5 }}>
          <TotalPriceBox totalPrice={totalPrice} coinAmount={coinAmount} />
        </View>
        <View style={{ flex: 1 }}>
          <LiquidPriceBox
            isLongSelected={isLongSelected}
            longLiquid={longLiquid}
            shortLiquid={shortLiquid}
          />
        </View>
      </View>
      <View style={{ flex: 1.5 }}>
        <AmountSettingBox
          parentSize={size}
          isLongSelected={isLongSelected}
          amountRate={amountRate}
          setAmountRate={setAmountRate}
        />
      </View>
      <View style={{ flex: 1.5, flexDirection: "row" }}>
        <View style={{ flex: 3, alignItems: "center" }}>
          {isLongSelected ? (
            <TradeButton
              isCandleMoving={isCandleMoving}
              buttonHandler={buyButtonHandler}
              isBuy={true}
            />
          ) : (
            <TradeButton
              isCandleMoving={isCandleMoving}
              buttonHandler={sellButtonHandler}
              isBuy={false}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default TradeController;
