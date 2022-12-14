import styled from "styled-components/native";
import { NEGATIVE, POSITIVE } from "../globalConstant";
import { ITheme } from "./theme";

interface IContainerProps {
  theme?: ITheme;
}

interface ITextContainerProps extends IContainerProps {
  isPositive: string;
}

interface IInfoContainerProps extends IContainerProps {
  isLong: boolean;
}

interface ICloseButtonContainerProps extends IContainerProps {
  isLong: boolean;
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

// Level
export const LevelLabelText = styled(BaseTextContainer)`
  color: "black";
  font-size: ${(props: IContainerProps) => props.theme.font.midiumTextFontSize};
`;

export const ProgressValueText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) =>
    props.theme.font.midiumValueFontSize};
`;

export const TargetValueText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.smallValueFontSize};
`;

export const LevelUpText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.midiumTextFontSize};
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

// Position Info
export const PositionTitleBoxText = styled(BaseTextContainer)`
  background-color: ${(props: IInfoContainerProps) =>
    props.isLong
      ? props.theme.colors.positiveTextColor
      : props.theme.colors.negativeTextColor};
  font-size: ${(props: IInfoContainerProps) =>
    props.theme.font.midiumTextFontSize};
  justify-content: center;
  align-items: center;
`;

export const PositionLeverageBoxText = styled(BaseTextContainer)`
  color: ${(props: IInfoContainerProps) =>
    props.isLong
      ? props.theme.colors.positiveTextColor
      : props.theme.colors.negativeTextColor};
  font-size: ${(props: IInfoContainerProps) =>
    props.theme.font.bigValueFontSize};
  font-weight: ${(props: IInfoContainerProps) =>
    props.theme.font.boldFontWeight};
  margin-left: 5px;
`;

export const PositionInfoTitleBoxText = styled(BaseTextContainer)`
  color: ${(props: IInfoContainerProps) =>
    props.theme.colors.toneDownTextColor};
  font-size: ${(props: IInfoContainerProps) =>
    props.theme.font.smallTextFontSize};
`;

export const PositionInfoValueBoxText = styled(BaseTextContainer)`
  font-size: ${(props: IInfoContainerProps) =>
    props.theme.font.midiumValueFontSize};
`;

export const LiquidValueText = styled(PositionInfoValueBoxText)`
  color: ${(props: IInfoContainerProps) =>
    props.isLong
      ? props.theme.colors.longLiquidActiveLineColor
      : props.theme.colors.shortLiquidActiveLineColor};
`;

export const OpenValueText = styled(PositionInfoValueBoxText)`
  color: ${(props: IContainerProps) => props.theme.colors.openPriceLineColor};
`;

export const UnrealizedPnlBoxText = styled(PositionInfoTitleBoxText)``;

export const UnrealizedPnlBoxValue = styled(PositionInfoValueBoxText)`
  color: ${(props: ITextContainerProps) =>
    props.isPositive == POSITIVE
      ? props.theme.colors.positiveTextColor
      : props.isPositive == NEGATIVE
      ? props.theme.colors.negativeTextColor
      : props.theme.colors.baseTextColor};
`;

export const PositionCloseButtonText = styled(BaseTextContainer)`
  /* color: ${(props: ICloseButtonContainerProps) =>
    props.isLong
      ? props.theme.colors.positiveTextColor
      : props.theme.colors.negativeTextColor}; */
  color: "black";
  font-weight: ${(props: ICloseButtonContainerProps) =>
    props.theme.font.boldFontWeight};
`;

export const EmptyPositionText = styled(BaseTextContainer)`
  font-weight: ${(props: IContainerProps) => props.theme.font.boldFontWeight};
`;

// Loan Info
export const DayNumberText = styled(BaseTextContainer)`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.dayNumberBackgroundColor};
  padding: 1px;
  font-size: ${(props: IContainerProps) => props.theme.font.smallTextFontSize};
  color: "black";
`;

export const LoanInfoTitleText = styled(PositionInfoTitleBoxText)``;

export const LoanInfoValueText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.smallTextFontSize};
`;

export const LoanInfoUnitText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.tinyFontsize};
`;

export const InterestTurnLimitText = styled(BaseTextContainer)`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.interestTurnLimitBackgroundColor};
  font-size: ${(props: IContainerProps) => props.theme.font.smallTextFontSize};
  padding: 1px;
`;

export const RemainTurnBoxText = styled(BaseTextContainer)`
  background-color: ${(props: IContainerProps) =>
    props.theme.colors.remainTurnBoxBackgrounderColor};
  padding: 1px;
  font-size: ${(props: IContainerProps) => props.theme.font.smallTextFontSize};
`;

// Controll Panel
export const ControlSectionTitleText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.smallTextFontSize};
  color: ${(props: IContainerProps) => props.theme.colors.toneDownTextColor};
`;

export const ControlSectionValueText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) =>
    props.theme.font.midiumValueFontSize};
`;

export const LiquidControlSectionValueText = styled(ControlSectionValueText)`
  color: ${(props: IInfoContainerProps) =>
    props.isLong
      ? props.theme.colors.longLiquidActiveLineColor
      : props.theme.colors.shortLiquidActiveLineColor};
`;

export const OpenButtonText = styled(BaseTextContainer)`
  /* color: ${(props: ICloseButtonContainerProps) =>
    props.isLong
      ? props.theme.colors.positiveTextColor
      : props.theme.colors.negativeTextColor}; */
  font-weight: ${(props: ICloseButtonContainerProps) =>
    props.theme.font.boldFontWeight};
`;

// Root Control Button
export const ResetButtonText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.bigTextFontSize};
  font-weight: ${(props: IContainerProps) => props.theme.font.boldFontWeight};
`;

export const ResetModalText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.midiumTextFontSize};
  font-weight: ${(props: IContainerProps) =>
    props.theme.font.regularFontWeight};
`;

export const NextTurnButtonText = styled(BaseTextContainer)`
  font-size: ${(props: IContainerProps) => props.theme.font.bigTextFontSize};
  font-weight: ${(props: IContainerProps) => props.theme.font.boldFontWeight};
`;
