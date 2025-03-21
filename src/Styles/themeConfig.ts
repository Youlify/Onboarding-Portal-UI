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
      fontSize: 14,
    },
    Radio: {
      controlHeightLG: 48,
      fontFamily: "Elza",
      buttonPaddingInline: 64,
      borderRadiusLG: 1000,
      colorPrimary: "#E2EBFF",
      colorPrimaryHover: "#E2EBFF",
      buttonSolidCheckedColor: "#2B6FF6",
      buttonSolidCheckedBg: "#E2EBFF",
      buttonSolidCheckedHoverBg: "#E2EBFF",
      colorBorder: "#D4D7DD",
    },
    Button: {
      controlHeight: 48,
      colorTextDisabled: "#6C717C",
      borderColorDisabled: "transparent",
      colorBgContainerDisabled: "#EBECEF",
    },
  },
};
