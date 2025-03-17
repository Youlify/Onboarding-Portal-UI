import { Form, Input } from "antd";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const PracticeInfoForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Form.Item name="name" label="Practice Legal Name">
        <Input />
      </Form.Item>
      <Form.Item name="name2" label="Practice Physical Address">
        <Input />
      </Form.Item>
    </BaseFormWrapper>
  );
};

export default PracticeInfoForm;
