import Slider from "@react-native-community/slider";
import { cloneDeep } from "lodash";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import CustomToggleSwitch from "../../assets/CustomSwitch";
import Switch from "../../assets/Switch";

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

  const amountRateHandler = (value: number) => {
    setAmountRate(value);
  };

  const buyButtonHandler = () => {
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
  };

  const sellButtonHandler = () => {
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
  };

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

  return (
    <View>
      <View>
        <Text>레버리지</Text>
        <CustomToggleSwitch
          options={LEVERAGE_UNITS}
          value={activeLeverage ? activeLeverage : leverage}
          setValueFunction={setLeverage}
          disabled={disabled}
        />
      </View>
      <View>
        <Text>보유 현금 대비 </Text>
        <Text>{amountRate}%</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={5}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={amountRate}
          onValueChange={amountRateHandler}
          tapToSeek={true}
        />
      </View>
      <View>
        <Text>
          주문총액 : {convertKrNumberType(Math.ceil(totalPrice))}원 | 개수 :{" "}
          {coinAmount}
        </Text>
        <Text>
          청산가 :{" "}
          {isLongSelected
            ? convertKrNumberType(Math.ceil(longLiquid))
            : convertKrNumberType(Math.ceil(shortLiquid))}
        </Text>
      </View>
      {isLongSelected ? (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              height: "100%",
              opacity: isCandleMoving ? 0.5 : 1,
            }}
            onPress={buyButtonHandler}
            disabled={isCandleMoving}
          >
            <Text>BUY</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              height: "100%",
              opacity: isCandleMoving ? 0.5 : 1,
            }}
            onPress={sellButtonHandler}
            disabled={isCandleMoving}
          >
            <Text>SELL</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default TradeController;
