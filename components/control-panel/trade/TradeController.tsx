import Slider from "@react-native-community/slider";
import { cloneDeep } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
} from "../../../atom";
import convertKrNumberType from "../../../functions/convertKrNumberType";
import { LEVERAGE_UNITS, TRANSACTION_FEE_RATE } from "../../../globalConstant";

import AmountSettingBox from "./AmountSettingBox";
import LeverageControlBox from "./LeverageControlBox";
import LiquidPriceBox from "./LiquidPriceBox";
import TotalPriceBox from "./TotalPriceBox";
import TradeButton from "./TradeButton";

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

  const buyButtonHandler = useCallback(() => {
    if (isLongSelected) {
      if (!isCandleMoving) {
        setCashAccount((prev) => prev - totalPrice);
        if (!longAccountDetail.positionActive && coinAmount > 0) {
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
        if (!shortAccountDetail.positionActive && coinAmount > 0) {
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
  }, [lastClosePrice, leverage, isCandleMoving, isLongSelected]);

  useEffect(() => {
    if (isCandleMoving) {
      setAmountRate(0);
    }
  }, [isCandleMoving]);

  return (
    <View>
      <LeverageControlBox
        activeLeverage={activeLeverage}
        leverage={leverage}
        setLeverage={setLeverage}
        disabled={disabled}
      />
      <AmountSettingBox amountRate={amountRate} setAmountRate={setAmountRate} />
      <View>
        <TotalPriceBox totalPrice={totalPrice} coinAmount={coinAmount} />
        <LiquidPriceBox
          isLongSelected={isLongSelected}
          longLiquid={longLiquid}
          shortLiquid={shortLiquid}
        />
      </View>
      {isLongSelected ? (
        <View>
          <TradeButton
            isCandleMoving={isCandleMoving}
            buttonHandler={buyButtonHandler}
            isBuy={true}
          />
        </View>
      ) : (
        <View>
          <TradeButton
            isCandleMoving={isCandleMoving}
            buttonHandler={sellButtonHandler}
            isBuy={false}
          />
        </View>
      )}
    </View>
  );
}

export default memo(TradeController);
