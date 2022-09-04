import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

export interface ISize {
  width: number;
  height: number;
  x: number;
  y: number;
}

const useComponentSize = () => {
  const [size, setSize] = useState<ISize>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setSize({ width, height, x, y });
  }, []);

  return { size, onLayout };
};

export default useComponentSize;
