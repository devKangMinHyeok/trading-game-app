import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useRecoilState } from "recoil";
import { isLongControllerActiveState } from "../../../atom";
import rootStyles from "../../../styles/rootStyles";
import CustomToggleSwitch from "../../assets/CustomSwitch";
import Switch from "../../assets/Switch";
import LongTradeController from "./long-trade-controller/LongTradeController";
import ShortTradeController from "./short-trade-controller/ShortTradeController";

function Trade() {
  const [isLongSelected, setIsLongSelected] = useRecoilState(
    isLongControllerActiveState
  );

  return (
    <View style={rootStyles.trade}>
      <CustomToggleSwitch
        options={[
          { label: "Long", value: true },
          { label: "Short", value: false },
        ]}
        value={isLongSelected}
        setValueFunction={setIsLongSelected}
      />
      {isLongSelected ? <LongTradeController /> : <ShortTradeController />}
    </View>
  );
}

export default Trade;
