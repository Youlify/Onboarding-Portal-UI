import { Form, Checkbox, Col, Row, ConfigProvider } from "antd";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const StripeForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <div className="stripe-form-appointment">
        <iframe
          title="onboarding-stripe-appointment"
          frameBorder={0}
          src="https://calendly.com/bo-youlify/demo?embed_domain=youlify.com&embed_type=Inline"
        />
      </div>
      <Row>
        <Col span={24}>
          <Form.Item
            name="agreee"
            rules={[{ required: true, message: "Please check agree" }]}
          >
            <ConfigProvider
              theme={{
                components: {
                  Checkbox: { fontFamily: "Elza-Medium", fontSize: 18 },
                },
              }}
            >
              <Checkbox>
                I have booked an appointment through the calendar above.
              </Checkbox>
            </ConfigProvider>
          </Form.Item>
        </Col>
      </Row>
    </BaseFormWrapper>
  );
};

export default StripeForm;
