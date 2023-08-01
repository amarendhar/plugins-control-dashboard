import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "store";
import { GlobalStyles } from "GlobalStyles";
import { defaultTheme } from "themes";
import { Navbar } from "containers";

export const Layout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Navbar />
        <Wrapper>
          <Outlet />
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;
