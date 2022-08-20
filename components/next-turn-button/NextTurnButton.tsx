import { Text, TouchableOpacity, View } from "react-native";
import rootStyles from "../../styles/rootStyles";

function NextTurnButton() {
  return (
    <View style={rootStyles.nextTurnButton}>
      <TouchableOpacity
        onPress={() => alert("Hello, world!")}
        style={{ backgroundColor: "skyblue" }}
      >
        <Text>Next Turn</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NextTurnButton;
