import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components/native";
import Display from "./components/Display";
import theme from "./styles/theme";

export default function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Display />
      </ThemeProvider>
    </RecoilRoot>
  );
}
