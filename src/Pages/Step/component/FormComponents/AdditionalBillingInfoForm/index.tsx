import { Form, Input, Select, Radio, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const AdditionalBillingInfoForm: React.FC<FormComponentProps> = ({
  fieldsProps,
}) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="need_payments"
            label="Do you need to take payments for cash based services, such as uncovered medications, form fees etc?"
            rules={[{ required: true, message: "Please select yes or no" }]}
          >
            <Radio.Group buttonStyle="solid" size="large">
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Form.Item
            name="payments"
            label="Do you take both credit card and cash/check payments?"
            rules={[
              {
                required: true,
                message: "Please input address city",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Form.Item
            name="need_billing"
            label="Do you bill any medication (codes starting with J, such as J3301)? "
            rules={[{ required: true, message: "Please select yes or no" }]}
          >
            <Radio.Group buttonStyle="solid" size="large">
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <FormList
            name="medications"
            label="Please list out all medications:"
            minCount={1}
            showDivider={false}
            required={true}
          >
            {(field) => (
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    key={field.key}
                    name={[field.name, "procedure_code"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select procedure code",
                      },
                    ]}
                  >
                    <Select placeholder="Search Procedure Code" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    key={field.key}
                    name={[field.name, "ndc_code"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select NDC code",
                      },
                    ]}
                  >
                    <Select placeholder="Search NDC Code" />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </FormList>
        </Col>
      </Row>
    </BaseFormWrapper>
  );
};

export default AdditionalBillingInfoForm;
