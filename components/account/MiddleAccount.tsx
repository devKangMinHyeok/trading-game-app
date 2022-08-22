import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { totalAccountState } from "../../atom";
import convertKrNumberType from "../../functions/convertKrNumberType";
import rootStyles from "../../styles/rootStyles";

function MiddleAccount() {
  const totalAccount = useRecoilValue(totalAccountState);
  return (
    <View style={rootStyles.middleAccount}>
      <Text>
        선물 평가 자산: {convertKrNumberType(totalAccount.futureValuation)}원
      </Text>
      <Text>보유 현금: {convertKrNumberType(totalAccount.cash)}원</Text>
    </View>
  );
}

export default MiddleAccount;
