import { Form, Input, Col, Row } from "antd";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const EHRLoginForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row gutter={24}>
        <Col span={8}>
          <div className="ehr-login-form-tips">
            Please create an EHR login account for Youlify with the following
            info: <br />
            <br />
            1. First Name:{" "}
            <span className="ehr-login-form-tips--dark">Youlify</span>
            <br />
            2. Last Name:{" "}
            <span className="ehr-login-form-tips--dark">Biller</span>
            <br />
            3. Work Email:{" "}
            <span className="ehr-login-form-tips--dark">xxx@youlify.com</span>
          </div>
        </Col>
        <Col span={16}>
          <div className="ehr-login-form-sub-title">
            Once the account is created, please fill out the followings:
          </div>
          <Form.Item
            name="user_name"
            label="EHR Account Username"
            rules={[
              { required: true, message: "Please input account username" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="EHR Account Password"
            rules={[
              { required: true, message: "Please input account password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="is_onboarding" initialValue={true} hidden={true}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </BaseFormWrapper>
  );
};

export default EHRLoginForm;
