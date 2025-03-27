import { Form, Input, Select, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const FacilityTypeOptions = ["Office", "Hospital"].map((item) => ({
  label: item,
  value: item,
}));

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
                  name={[field.name, "name"]}
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
                  name={[field.name, "facility_type"]}
                  label="Facility Type"
                  rules={[
                    {
                      required: true,
                      message: "Please select facility type",
                    },
                  ]}
                >
                  <Select options={FacilityTypeOptions} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "edi_name"]}
                  label="Facility EDI Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input facility edi name",
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
                  name={[field.name, "address_line_one"]}
                  label="Facility Address Line One"
                  rules={[
                    {
                      required: true,
                      message: "Please input facility address line one",
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
                  name={[field.name, "address_line_two"]}
                  label="Facility Address Line Two"
                  rules={[
                    {
                      required: true,
                      message: "Please input facility address line two",
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
                  name={[field.name, "city"]}
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
                  name={[field.name, "state"]}
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
                  name={[field.name, "zip"]}
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
                  name={[field.name, "npi"]}
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
