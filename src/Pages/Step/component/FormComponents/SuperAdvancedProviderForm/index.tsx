import { Form, Input, Radio, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const SuperAdvancedProviderForm: React.FC<FormComponentProps> = ({
  fieldsProps,
}) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="has_super_advanced_providers"
            label={
              <div className="super-advanced-provider-form-q">
                <div className="super-advanced-provider-form-q-title">
                  Is any of the advance providers billing under a supervising
                  provider?
                </div>
                <div className="super-advanced-provider-form-q-description">
                  e.g. Jane Doe PA-C's patients are billed as John Smith MD. On
                  the claim, the rendering provider is John Smith MD.
                </div>
              </div>
            }
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Radio.Group buttonStyle="solid" size="large">
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 48 }}>
        <Col span={24}>
          <Form.Item
            name="always_paired"
            label={
              <div className="super-advanced-provider-form-q">
                <div className="super-advanced-provider-form-q-title">
                  Is the advance provider always paired with the supervising
                  provider?
                </div>
              </div>
            }
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Radio.Group buttonStyle="solid" size="large">
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item dependencies={["always_paired"]}>
        {({ getFieldValue }) =>
          getFieldValue("always_paired") ? (
            <FormList
              variant="rich"
              name="provider_pairs"
              addText="Add New Pair"
              minCount={1}
              showDivider={false}
              required={true}
              style={{ marginTop: 48 }}
            >
              {(field) => (
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      key={field.key}
                      name={[field.name, "advanced_provider"]}
                      label="Advance Provider"
                      rules={[
                        {
                          required: true,
                          message: "Please input advance provider",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      key={field.key}
                      name={[field.name, "supervising_provider"]}
                      label="Supervising Provider"
                      rules={[
                        {
                          required: true,
                          message: "Please input supervising provider",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </FormList>
          ) : null
        }
      </Form.Item>
    </BaseFormWrapper>
  );
};

export default SuperAdvancedProviderForm;
