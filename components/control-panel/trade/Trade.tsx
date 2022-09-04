import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { isLongControllerActiveState } from "../../../atom";
import rootStyles from "../../../styles/rootStyles";
import theme from "../../../styles/theme";
import CustomToggleSwitch from "../../assets/CustomSwitch";
import LongTradeController from "./trade-controller/LongTradeController";
import ShortTradeController from "./trade-controller/ShortTradeController";

function Trade() {
  const [isLongSelected, setIsLongSelected] = useRecoilState(
    isLongControllerActiveState
  );
  return (
    <View style={rootStyles.trade}>
      <View style={{ flex: 1, backgroundColor: theme.colors.backgroundColor1 }}>
        <CustomToggleSwitch
          options={[
            { label: "롱", value: true },
            { label: "숏", value: false },
          ]}
          value={isLongSelected}
          setValueFunction={setIsLongSelected}
          selectedColor={
            isLongSelected
              ? theme.colors.longButtonColor
              : theme.colors.shortButtonColor
          }
          nonSelectedColor={theme.colors.toneDownTextColor}
        />
      </View>
      <View style={{ flex: 7, backgroundColor: theme.colors.backgroundColor1 }}>
        {isLongSelected ? <LongTradeController /> : <ShortTradeController />}
      </View>
    </View>
  );
}

export default Trade;
