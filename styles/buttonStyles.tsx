import styled from "styled-components/native";
import { ITheme } from "./theme";

interface IContainerProps {
  theme?: ITheme;
}

export const CloseButtonContainer = styled.TouchableOpacity`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.CloseButtonBackgroundColor};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
