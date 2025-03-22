import { createGlobalStyle } from "antd-style";

const GlobalStyle = createGlobalStyle`
  .ant-form-item-label label {
    font-family: Elza-Semibold;
  }
  .ant-form-item-additional {
    margin-bottom: 12px;
  }
  .ant-upload-wrapper .ant-upload-drag {
    border: none;
  }
  .ant-radio-button-wrapper:hover {
    color: #2B6FF6;
  }
`;

export { GlobalStyle };
