import { memo } from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import { totalAccountState } from "../../atom";
import convertKrNumberType from "../../functions/convertKrNumberType";
import { INITIAL_CASH } from "../../globalConstant";
import rootStyles from "../../styles/rootStyles";
import {
  TopAccountRate,
  TopAccountText,
  TopAccountValue,
} from "../../styles/TextStyledComponents";

function TopAccount() {
  const totalAccount = useRecoilValue(totalAccountState);

  return (
    <View style={rootStyles.topAccount}>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TopAccountText>총 보유자산 | </TopAccountText>
      </View>
      <View style={{ flex: 2.3, flexDirection: "row", alignItems: "flex-end" }}>
        <TopAccountValue isPositive={totalAccount.isPositive}>
          {convertKrNumberType(Math.ceil(totalAccount.totalAsset))}원{" "}
        </TopAccountValue>
        <TopAccountRate isPositive={totalAccount.isPositive}>
          {(
            ((totalAccount.totalAsset - INITIAL_CASH) / INITIAL_CASH) *
            100
          ).toFixed(2)}
          %
        </TopAccountRate>
      </View>
    </View>
  );
}

export default memo(TopAccount);
