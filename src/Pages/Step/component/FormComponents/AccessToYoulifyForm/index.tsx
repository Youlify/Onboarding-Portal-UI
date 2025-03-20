import { Form, Input, Select, Col, Row } from "antd";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const RoleOptions = ["Limited", "Full"].map((item) => ({
  label: item,
  value: item,
}));

const AccessToYoulifyForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <FormList
        variant="rich"
        name="access_accounts"
        addText="Add Account"
        minCount={1}
        required={true}
      >
        {(field) => (
          <>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "first_name"]}
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input first_name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  key={field.key}
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
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "email"]}
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  key={field.key}
                  name={[field.name, "role"]}
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please select role",
                    },
                  ]}
                >
                  <Select options={RoleOptions} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </FormList>
    </BaseFormWrapper>
  );
};

export default AccessToYoulifyForm;
