interface IColors {
  backgroundColor1: string;
  backgroundColor2: string;

  textColor: string;
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
  backgroundColor2: "#1e232911",

  textColor: "#FFFFFF",
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
  bigRateFontSize: string;

  midiumTextFontSize: string;
}

const font: IFont = {
  bigValueFontSize: "16px",
  bigRateFontSize: "14px",
  midiumTextFontSize: "14px",
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
