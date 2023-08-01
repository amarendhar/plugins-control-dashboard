import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "GlobalStyles";
import { defaultTheme } from "themes";
import { Navbar } from "containers";

export const Layout = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Navbar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;
