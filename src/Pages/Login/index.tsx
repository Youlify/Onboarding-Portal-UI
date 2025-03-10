import { useContext, useState, ChangeEvent } from "react";
import dayjs from "dayjs";
import { Form, Input, DatePicker, Button, Alert } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRequest } from "ahooks";
import { useToken } from "@hooks/useToken";
import { globalContext } from "@provider/global/context";
// import { login } from "@service/factory";
import "./index.less";

interface FormFieldValues extends API.APILoginParams {}

const formatAccountNumber = (value: string) => {
  let cleaned = value.replace(/[^A-Za-z0-9]/g, "");
  cleaned = cleaned.toUpperCase();
  let formatted = cleaned.slice(0, 8);
  formatted = formatted.replace(/(\w{4})(?=\w)/g, "$1-");
  return formatted;
};

const Login: React.FC = () => {
  const [form] = useForm<FormFieldValues>();
  const { setGlobalValue } = useContext(globalContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useToken();
  // const { run } = useRequest(login, {
  //   manual: true,
  //   onSuccess(data, params) {
  //     const accountInfo = params?.[0];
  //     setToken(data);
  //     setGlobalValue?.({ accountInfo, accountAPIInfo: data });
  //   },
  //   onError(e) {
  //     setErrorMessage(e.message);
  //   },
  // });

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.dob) values.dob = dayjs(values.dob).format("MM/DD/YYYY");
      // run(values);
    } catch (e) {
      console.log(e);
    }
  };

  const accountNumberFormValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatAccountNumber(value);
    return formattedValue;
  };

  return (
    <div className="login-container">
      <div className="login-youlify-logo"></div>
      <div className="login-box">
        <div className="login-box-top">
          <div className="login-box-title">Patient Payment Portal</div>
          <div className="login-box-description">
            View your balance, services and make payments directly in the
            payment portal
          </div>
        </div>
        <div className="login-box-form">
          {!!errorMessage && (
            <Alert
              className="login-box-form-alert"
              type="error"
              message={errorMessage}
            />
          )}
          <Form layout="vertical" requiredMark={false} form={form}>
            <Form.Item
              name="account_number"
              label="Account number"
              rules={[
                {
                  required: true,
                  message: "Please input your account number",
                },
                {
                  pattern: /\w{4}-\w{4}/g,
                  message: "Please input a valid account number",
                },
              ]}
              getValueFromEvent={accountNumberFormValueChange}
            >
              <Input onChange={() => {}} placeholder="Enter account number" />
            </Form.Item>
            <Form.Item
              name="dob"
              label="Patient date of birth"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth",
                },
              ]}
            >
              <DatePicker
                placeholder="MM/DD/YYYY"
                format="MM/DD/YYYY"
                className="login-box-form-datepicker"
              />
            </Form.Item>
          </Form>
          <Button
            type="primary"
            className="login-box-form-submit-btn"
            onClick={onSubmit}
          >
            View balance
          </Button>
        </div>
      </div>
      <div className="login-disclaimer-message">
        <div className="login-disclaimer-message-title">Disclaimer</div>
        <div className="login-disclaimer-message-description">
          This payment portal is a secure system for authorized users only. By
          accessing this system, you agree to comply with our{" "}
          <a
            href="https://www.youlify.ai/term-of-use"
            target="_blank"
            rel="noreferrer"
            className="login-disclaimer-message-description-link"
          >
            terms of use
          </a>{" "}
          and{" "}
          <a
            href="https://www.youlify.ai/privacystatement"
            target="_blank"
            rel="noreferrer"
            className="login-disclaimer-message-description-link"
          >
            privacy policy
          </a>
          . We do not store payment details on our servers. Users are
          responsible for safeguarding their login credentials. Unauthorized
          access or misuse may result in account suspension or legal action.
          <div className="login-disclaimer-message-description-footer">
            <div>@2025 Youlify.ai All rights reserved.</div>
            <div>Questions? Email us at support@youlify.ai</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
