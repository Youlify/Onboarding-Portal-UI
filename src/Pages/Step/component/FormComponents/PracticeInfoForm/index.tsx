import { Form, Input } from "antd";

const PracticeInfoForm = (props: any) => {
  return (
    <>
      <Form.Item name="name" label="Practice Legal Name">
        <Input />
      </Form.Item>
      <Form.Item name="name2" label="Practice Physical Address">
        <Input />
      </Form.Item>
    </>
  );
};

export default PracticeInfoForm;
