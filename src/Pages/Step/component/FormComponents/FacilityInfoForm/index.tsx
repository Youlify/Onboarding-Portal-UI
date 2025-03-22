import { Form, Input, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const FacilityInfoForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <FormList
        variant="rich"
        name="facilities"
        addText="Add Facility"
        minCount={1}
        required={true}
      >
        {(field) => (
          <>
            <Row>
              <Col span={24}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "advanced_provider"]}
                  label="Facility Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input facility name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "advanced_provider"]}
                  label="Facility Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input facility address",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "advanced_provider"]}
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: "Please input city",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "advanced_provider"]}
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: "Please input state",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "advanced_provider"]}
                  label="Zip Code"
                  rules={[
                    {
                      required: true,
                      message: "Please input zip code",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "advanced_provider"]}
                  label="Facility NPI"
                  tooltip="You can find the facility NPI on NPPES NPI Registry. Link →"
                  rules={[
                    {
                      required: true,
                      message: "Please input facility NPI",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </FormList>
    </BaseFormWrapper>
  );
};

export default FacilityInfoForm;
