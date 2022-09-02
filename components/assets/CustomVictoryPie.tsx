import { memo } from "react";
import { VictoryPie } from "victory-native";
import { SCREEN_WIDTH } from "../../styles/rootStyles";

function CustomVictoryPie({
  pieCashRate,
  pieFutureRate,
}: {
  pieCashRate: number;
  pieFutureRate: number;
}) {
  return (
    <VictoryPie
      width={SCREEN_WIDTH / 2}
      height={SCREEN_WIDTH / 2}
      padding={{ top: 20, bottom: 30, right: 30 }}
      animate={{ duration: 300 }}
      data={[
        { x: "현금", y: pieCashRate },
        { x: "선물", y: pieFutureRate },
      ]}
      colorScale={["tomato", "orange"]}
      labels={({ datum }) => {
        if (datum.y > 0) return datum.x;
      }}
      labelPosition={"centroid"}
      labelRadius={({ innerRadius }) => Number(innerRadius) + 20}
    />
  );
}

export default memo(CustomVictoryPie);
