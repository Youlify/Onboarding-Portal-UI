import { Form, Input, Select, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const SuffixOptions = [
  "MD",
  "DO",
  "NP-C",
  "PA-C",
  "DPT",
  "PT",
  "OTR",
  "OTR/L",
].map((item) => ({
  label: item,
  value: item,
}));

const RenderingProviderForm: React.FC<FormComponentProps> = ({
  fieldsProps,
}) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <FormList
        variant="rich"
        name="rendering_providers"
        addText="Add Rendering Provider"
        minCount={1}
        required={true}
      >
        {(field) => (
          <>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name={[field.name, "first_name"]}
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input first name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={[field.name, "last_name"]}
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input last name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={[field.name, "suffix"]}
                  label="Suffix"
                  rules={[
                    {
                      required: true,
                      message: "Please select suffix",
                    },
                  ]}
                >
                  <Select options={SuffixOptions} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name={[field.name, "rendering_npi"]}
                  label="Rendering Provider NPI"
                  rules={[
                    {
                      required: true,
                      message: "Please input rendering NPI",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name={[field.name, "taxonomy_codes"]}
                  label="Taxonomy Code"
                  rules={[
                    {
                      required: true,
                      message: "Please select suffix",
                    },
                  ]}
                >
                  <Select mode="multiple" />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </FormList>
    </BaseFormWrapper>
  );
};

export default RenderingProviderForm;
