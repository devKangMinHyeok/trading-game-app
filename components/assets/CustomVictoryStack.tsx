import { memo, useEffect, useState } from "react";
import { VictoryBar, VictoryLabel, VictoryStack } from "victory-native";
import theme from "../../styles/theme";

function CustomVictoryStack({
  parentSize,
  barCashRate,
  barFutureRate,
  position,
}: {
  parentSize: { width: number; height: number; x: number; y: number };
  barCashRate: number;
  barFutureRate: number;
  position: boolean;
}) {
  const [barColor, setBarColor] = useState(
    position ? theme.colors.positivePriceColor : theme.colors.negativePriceColor
  );

  useEffect(() => {
    setBarColor(
      position
        ? theme.colors.positivePriceColor
        : theme.colors.negativePriceColor
    );
  }, [position]);

  return (
    <VictoryStack
      width={parentSize.width || 100}
      height={parentSize.height || 100}
      padding={10}
      animate={{ duration: 300 }}
      colorScale={[barColor, "whitesmoke"]}
    >
      <VictoryBar
        data={[{ x: "a", y: barFutureRate }]}
        labels={({ datum }) => `${Math.ceil(datum.y * 100)}%`}
        style={{ labels: { fill: "white", fontSize: 14 } }}
        labelComponent={<VictoryLabel dx={24} dy={6} />}
        barWidth={15}
      />
      <VictoryBar data={[{ x: "a", y: barCashRate }]} barWidth={15} />
    </VictoryStack>
  );
}

export default memo(CustomVictoryStack);
