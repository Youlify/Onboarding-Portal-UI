import React from "react";
import { useRoutes } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import { configResponsive } from "ahooks";
import routes from "@router/index";
import { LoginProvider } from "@provider/login/provider";
import { GlobalProvider } from "@provider/global/provider";
import { GlobalStyle } from "./Styles/global";
import { defaultTheme } from "@styles/themeConfig";

configResponsive({
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1440,
});

const App: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <ConfigProvider theme={defaultTheme} wave={{ disabled: true }}>
      <GlobalProvider>
        <LoginProvider>
          <>
            <GlobalStyle />
            <AntdApp className="app">{element}</AntdApp>
          </>
        </LoginProvider>
      </GlobalProvider>
    </ConfigProvider>
  );
};

export default App;
