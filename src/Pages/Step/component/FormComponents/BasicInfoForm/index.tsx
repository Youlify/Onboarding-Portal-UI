import { Form, Input } from "antd";
import BaseFormWrapper from "../BaseFormWrapper";

const BasicInfoForm = () => {
  return (
    <BaseFormWrapper layout="vertical">
      <Form.Item name="name" label="name">
        <Input />
      </Form.Item>
    </BaseFormWrapper>
  );
};

export default BasicInfoForm;
