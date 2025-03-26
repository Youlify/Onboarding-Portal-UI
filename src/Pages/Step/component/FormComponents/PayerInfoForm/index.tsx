import { Form, Input, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const PayerInfoForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row gutter={24}>
        <Col span={8}>
          <div className="payer-info-form-tips">
            Please create an payer login account for Youlify with the following
            info: <br />
            <br />
            1. First Name:{" "}
            <span className="payer-info-form-tips--dark">Youlify</span>
            <br />
            2. Last Name:{" "}
            <span className="payer-info-form-tips--dark">Biller</span>
            <br />
            3. Work Email:{" "}
            <span className="payer-info-form-tips--dark">xxx@youlify.com</span>
          </div>
        </Col>
        <Col span={16}>
          <FormList
            variant="rich"
            name="payers"
            addText="Add Payer"
            minCount={1}
            required={true}
            renderOperationCopy={() => null}
          >
            {(field) => (
              <>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name={[field.name, "id"]}
                      label="ID"
                      hidden={true}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name={[field.name, "payer_name"]}
                      label="Payer"
                      rules={[
                        { required: true, message: "Please input payer name" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name={[field.name, "login_name"]}
                      label="Login Name (Optional)"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[field.name, "login_password"]}
                      label="Login Password (Optional)"
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </FormList>
        </Col>
      </Row>
    </BaseFormWrapper>
  );
};

export default PayerInfoForm;
