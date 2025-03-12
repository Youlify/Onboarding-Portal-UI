import { ThemeConfig } from "antd";

export const defaultTheme: ThemeConfig = {
  token: {
    colorPrimary: "#2D40CB",
    borderRadius: 4,
    fontFamily: "Elza",
    fontSize: 16,
  },
  components: {
    Form: {
      itemMarginBottom: 32,
      verticalLabelPadding: "0 0 12px",
      labelFontSize: 16,
      labelColor: "#141414",
    },
    Input: {
      controlHeight: 48,
    },
    Button: {
      controlHeight: 48,
    },
  },
};
