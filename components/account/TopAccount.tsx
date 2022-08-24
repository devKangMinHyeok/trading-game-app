import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { totalAccountState } from "../../atom";
import convertKrNumberType from "../../functions/convertKrNumberType";
import { INITIAL_CASH } from "../../globalConstant";
import rootStyles from "../../styles/rootStyles";

function TopAccount() {
  const totalAccount = useRecoilValue(totalAccountState);

  return (
    <View style={rootStyles.topAccount}>
      <Text style={{ fontSize: 16 }}>
        평가자산:
        {convertKrNumberType(Math.ceil(totalAccount.totalAsset))}원{" "}
        {(
          ((totalAccount.totalAsset - INITIAL_CASH) / INITIAL_CASH) *
          100
        ).toFixed(2)}
        %
      </Text>
    </View>
  );
}

export default TopAccount;
