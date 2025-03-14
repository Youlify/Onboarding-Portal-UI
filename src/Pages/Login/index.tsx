import { useContext, useState } from "react";
import { Form, Input, Button, ConfigProvider } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRequest } from "ahooks";
import { useToken } from "@hooks/useToken";
import { globalContext } from "@provider/global/context";
// import { login } from "@service/factory";
import "./index.less";

interface FormFieldValues extends API.APILoginParams {}

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
      // run(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-banner">
        <img
          className="login-banner-bglogo"
          alt="bglogo"
          src={require("../../Assets/images/youlify_logo_bg.png")}
        />
        <div className="login-banner-logo-container">
          <div className="login-banner-logo"></div>
        </div>
        <div className="login-banner-text">
          Welcome! We're thrilled to partner with you. <br />
          <br />
          To set you up for success, we'll start by gathering a few key details.
        </div>
      </div>
      <div className="login-content">
        <div className="login-box">
          <div className="login-box-title">Onboarding Portal</div>
          <div className="login-box-form">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#2D40CB",
                },
                components: {
                  Form: {
                    itemMarginBottom: 32,
                    labelFontSize: 14,
                  },
                },
              }}
            >
              <>
                <Form layout="vertical" requiredMark={false} form={form}>
                  <Form.Item
                    name="access_code"
                    label="Access Code"
                    rules={[
                      {
                        required: true,
                        message: "Please input your access code",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={onSubmit}
                >
                  Log In
                </Button>
              </>
            </ConfigProvider>
          </div>
          <div className="login-disclaimer">
            <div className="login-disclaimer-title">Disclaimer</div>
            <div className="login-disclaimer-description">
              This payment portal is a secure system for authorized users only.
              By accessing this system, you agree to comply with our{" "}
              <a
                href="https://www.youlify.ai/terms"
                target="_blank"
                rel="noreferrer"
              >
                terms of use
              </a>{" "}
              and{" "}
              <a
                href="https://www.youlify.ai/privacy"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </a>
              . We do not store payment details on our servers. Users are
              responsible for safeguarding their login credentials. Unauthorized
              access or misuse may result in account suspension or legal action.
              <br />
              <br />
              <br />
              @2025 Youlify.ai All rights reserved.
              <br />
              Questions? Email us at support@youlify.ai
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
