import { ThemeConfig } from "antd";

export const defaultTheme: ThemeConfig = {
  token: {
    colorPrimary: "#2B6FF6",
    borderRadius: 4,
    fontFamily: "Elza",
    fontSize: 16,
  },
  components: {
    Form: {
      itemMarginBottom: 16,
      verticalLabelPadding: "0 0 12px",
      labelFontSize: 16,
      labelColor: "#141414",
    },
    Input: {
      controlHeight: 48,
    },
    Select: {
      controlHeight: 48,
    },
    Checkbox: {
      fontFamily: "Elza-Semibold",
    },
    Button: {
      controlHeight: 48,
    },
  },
};
