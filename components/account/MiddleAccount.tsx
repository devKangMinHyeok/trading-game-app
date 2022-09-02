import { memo } from "react";
import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { totalAccountState } from "../../atom";
import convertKrNumberType from "../../functions/convertKrNumberType";
import rootStyles from "../../styles/rootStyles";
import {
  MiddleAccountText,
  MiddleAccountValue,
} from "../../styles/TextStyledComponents";

function MiddleAccount() {
  const totalAccount = useRecoilValue(totalAccountState);
  return (
    <View style={rootStyles.middleAccount}>
      <View style={{ flex: 1, padding: 10 }}>
        <MiddleAccountText>선물 </MiddleAccountText>
        <MiddleAccountValue>
          {convertKrNumberType(Math.ceil(totalAccount.futureValuation))}원
        </MiddleAccountValue>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <MiddleAccountText>현금 </MiddleAccountText>
        <MiddleAccountValue>
          {convertKrNumberType(Math.ceil(totalAccount.cash))}원
        </MiddleAccountValue>
      </View>
    </View>
  );
}

export default memo(MiddleAccount);
