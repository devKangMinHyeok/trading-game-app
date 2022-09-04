interface IColors {
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundColor3: string;

  baseTextColor: string;
  toneDownTextColor: string;
  positiveTextColor: string;
  negativeTextColor: string;

  longButtonColor: string;
  longCandleColor: string;
  positivePriceColor: string;

  shortButtonColor: string;
  shortCandleColor: string;
  negativePriceColor: string;

  longLiquidActiveLineColor: string;
  longLiquidInactiveLineColor: string;

  shortLiquidActiveLineColor: string;
  shortLiquidInactiveLineColor: string;

  openPriceLineColor: string;

  CloseButtonBackgroundColor: string;
}

const colors: IColors = {
  backgroundColor1: "#161A1E",
  backgroundColor2: "#1e2227ff",
  backgroundColor3: "#303030ff",

  baseTextColor: "#FFFFFF",
  toneDownTextColor: "#bebebe",
  positiveTextColor: "#32D993",
  negativeTextColor: "#F6465D",

  longButtonColor: "#32D993",
  longCandleColor: "#0ECB81",
  positivePriceColor: "#13B074",

  shortButtonColor: "#F6465D",
  shortCandleColor: "#F6465D",
  negativePriceColor: "#F6465D",

  longLiquidActiveLineColor: "#2be6ff",
  longLiquidInactiveLineColor: "#2be6ff8e",

  shortLiquidActiveLineColor: "#ee32ff",
  shortLiquidInactiveLineColor: "#ee32ff8c",

  openPriceLineColor: "#ffc56e",

  CloseButtonBackgroundColor: "#ffffff",
};

interface IFont {
  bigValueFontSize: string;
  midiumValueFontSize: string;
  smallValueFontSize: string;

  bigRateFontSize: string;

  midiumTextFontSize: string;
  bigTextFontSize: string;
  smallTextFontSize: string;

  boldFontWeight: number;
  regularFontWeight: number;
  lightFontWeight: number;
}

const font: IFont = {
  bigValueFontSize: "16px",
  midiumValueFontSize: "14px",
  smallValueFontSize: "12px",

  bigRateFontSize: "14px",

  bigTextFontSize: "16px",
  midiumTextFontSize: "14px",
  smallTextFontSize: "12px",

  boldFontWeight: 600,
  regularFontWeight: 500,
  lightFontWeight: 400,
};

export interface ITheme {
  colors: IColors;
  font: IFont;
}

const theme: ITheme = {
  colors,
  font,
};

export default theme;
