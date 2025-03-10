import { ThemeConfig } from "antd";

export const defaultTheme: ThemeConfig = {
  token: {
    fontFamily: "Elza",
    fontSize: 16,
    colorPrimary: "#1D212A",
    colorBorder: "#353A44",
    colorTextPlaceholder: "#f1f1f1",
    borderRadius: 4,
    controlHeight: 48,
    controlOutline: "#353A44",
    colorBgContainer: "#1D212A",
    colorErrorOutline: "none",
  },
  components: {
    Form: {
      itemMarginBottom: 32,
      verticalLabelPadding: "0 0 12px",
      labelFontSize: 18,
      labelColor: "#ffffff",
      labelRequiredMarkColor: "#2B6FF6",
    },
    Input: {
      colorText: "#ffffff",
      activeBorderColor: "#353A44",
      hoverBorderColor: "#353A44",
    },
  },
};
