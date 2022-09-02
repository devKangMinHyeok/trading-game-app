import styled from "styled-components/native";
import { NEGATIVE, POSITIVE } from "../globalConstant";
import { ITheme } from "./theme";

interface IContainerProps {
  theme?: ITheme;
}

interface ITextContainerProps extends IContainerProps {
  isPositive: string;
}

export const BaseTextContainer = styled.Text`
  color: ${(props: IContainerProps) => props.theme.colors.baseTextColor};
`;

// Top Account
export const TopAccountText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.midiumTextFontSize};
`;

export const TopAccountValue = styled(BaseTextContainer)`
  font-size: ${(props: ITextContainerProps) =>
    props.theme.font.bigValueFontSize};
  color: ${(props: ITextContainerProps) =>
    props.isPositive == POSITIVE
      ? props.theme.colors.positiveTextColor
      : props.isPositive == NEGATIVE
      ? props.theme.colors.negativeTextColor
      : props.theme.colors.baseTextColor};
`;

export const TopAccountRate = styled(BaseTextContainer)`
  font-size: ${(props: ITextContainerProps) =>
    props.theme.font.bigRateFontSize};
  color: ${(props: ITextContainerProps) =>
    props.isPositive == POSITIVE
      ? props.theme.colors.positiveTextColor
      : props.isPositive == NEGATIVE
      ? props.theme.colors.negativeTextColor
      : props.theme.colors.baseTextColor};
`;

// Middle Account
export const MiddleAccountText = styled(BaseTextContainer)`
  color: ${(props: IContainerProps) => props.theme.colors.toneDownTextColor};
  font-size: ${(props: IContainerProps) => props.theme.font.smallTextFontSize};
`;
export const MiddleAccountValue = styled(BaseTextContainer)`
  color: ${(props: IContainerProps) => props.theme.colors.baseTextColor};
  font-size: ${(props: IContainerProps) => props.theme.font.bigValueFontSize};
`;
