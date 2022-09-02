interface IColors {
  backgroundColor1: string;
  backgroundColor2: string;

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
}

const colors: IColors = {
  backgroundColor1: "#161A1E",
  backgroundColor2: "#1e2227ff",

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

  longLiquidActiveLineColor: "#008496",
  longLiquidInactiveLineColor: "#00849642",

  shortLiquidActiveLineColor: "#890096",
  shortLiquidInactiveLineColor: "#8900963e",

  openPriceLineColor: "#5667ff",
};

interface IFont {
  bigValueFontSize: string;
  midiumValueFontSize: string;
  smallValueFontSize: string;

  bigRateFontSize: string;

  midiumTextFontSize: string;
  bigTextFontSize: string;
  smallTextFontSize: string;
}

const font: IFont = {
  bigValueFontSize: "16px",
  midiumValueFontSize: "14px",
  smallValueFontSize: "12px",

  bigRateFontSize: "14px",

  bigTextFontSize: "16px",
  midiumTextFontSize: "14px",
  smallTextFontSize: "12px",
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
