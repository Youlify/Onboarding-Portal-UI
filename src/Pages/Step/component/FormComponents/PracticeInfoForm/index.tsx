import { Form, Input, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const PracticeInfoForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="practice_legal_name"
            label="Practice Legal Name"
            rules={[
              { required: true, message: "Please input practice legal name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name={["address", "physical_address"]}
            label="Practice Physical Address"
            rules={[
              {
                required: true,
                message: "Please input practice physical address",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            name={["address", "city"]}
            label="City"
            rules={[
              {
                required: true,
                message: "Please input address city",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={["address", "state"]}
            label="State"
            rules={[
              {
                required: true,
                message: "Please input address state",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={["address", "zip"]}
            label="Zip Code"
            rules={[
              {
                required: true,
                message: "Please input address zip code",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="business_contact_number"
            label="Business Contact Number"
            rules={[
              {
                required: true,
                message: "Please input business contact number",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormList
            name="taxonomy_codes"
            label="Taxonomy Code"
            tooltip="You can find your taxonomy code on the National Uniform Claim Committee code (NUCC) code set list. Link →"
          >
            {(field) => (
              <>
                <Form.Item key={field.key} name={field.name}>
                  <Input />
                </Form.Item>
              </>
            )}
          </FormList>
        </Col>
      </Row>
    </BaseFormWrapper>
  );
};

export default PracticeInfoForm;
