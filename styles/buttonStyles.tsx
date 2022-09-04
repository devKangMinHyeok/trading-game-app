import styled from "styled-components/native";
import { ITheme } from "./theme";

interface IContainerProps {
  theme?: ITheme;
}

export const BaseButton = styled.TouchableOpacity`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.CloseButtonBackgroundColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const CloseButtonContainer = styled(BaseButton)`
  width: 100%;
  height: 100%;
`;

export const OpenButtonContainer = styled(BaseButton)`
  width: 80%;
  height: 90%;
`;

export const AccountResetButtonContainer = styled(BaseButton)`
  width: 80%;
  height: 70%;
`;

export const NextTurnButtonContainer = styled(BaseButton)`
  width: 80%;
  height: 70%;
`;
