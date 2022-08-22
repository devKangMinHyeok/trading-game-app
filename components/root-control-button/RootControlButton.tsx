import { Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";
import { isCandleMovingState, turnNumberState } from "../../atom";
import rootStyles from "../../styles/rootStyles";

function RootControlButton() {
  const [turnNumber, setTurnNumber] = useRecoilState(turnNumberState);
  const [isCandleMoving, setIsCandleMoving] =
    useRecoilState(isCandleMovingState);
  const nextTurnHandler = () => {
    setIsCandleMoving(true);
    setTurnNumber((prev) => prev + 1);
  };

  return (
    <View style={rootStyles.rootControlButton}>
      <TouchableOpacity
        onPress={nextTurnHandler}
        style={
          isCandleMoving
            ? { backgroundColor: "skyblue", height: "100%", opacity: 0.6 }
            : { backgroundColor: "skyblue", height: "100%" }
        }
        disabled={isCandleMoving}
      >
        <Text>Next Turn</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RootControlButton;
