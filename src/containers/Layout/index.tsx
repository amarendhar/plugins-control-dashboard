import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "store";
import { GlobalStyles } from "GlobalStyles";
import { defaultTheme } from "themes";
import { Navbar } from "containers";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Navbar />
        <Wrapper>
          <Outlet />
        </Wrapper>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;
