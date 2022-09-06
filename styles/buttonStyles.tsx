import styled from "styled-components/native";
import { ITheme } from "./theme";

interface IContainerProps {
  theme?: ITheme;
}

interface IOpenContainerProps extends IContainerProps {
  isLong: boolean;
}

export const BaseButton = styled.TouchableOpacity`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.CloseButtonBackgroundColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const CloseButtonContainer = styled(BaseButton)`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.CloseButtonBackgroundColor2};
  width: 100%;
  height: 100%;
`;

export const OpenButtonContainer = styled(BaseButton)`
  background-color: ${(props: IOpenContainerProps) =>
    props.isLong
      ? props.theme.colors.longButtonColor
      : props.theme.colors.shortButtonColor};
  width: 80%;
  height: 90%;
`;

export const AccountResetButtonContainer = styled(BaseButton)`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.resetButtonBackgroundColor};
  width: 80%;
  height: 40%;
`;

export const NextTurnButtonContainer = styled(BaseButton)`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.nextTurnButtonBackgroundColor};
  width: 80%;
  height: 40%;
`;
