import { forwardRef, useImperativeHandle } from "react";
import { Form, FormProps, FormInstance } from "antd";

export interface BaseFormWrapperRef extends FormInstance {}

export interface BaseFormWrapperProps extends FormProps {
  ref: React.RefObject<BaseFormWrapperRef>;
  children: React.ReactNode;
}

export interface FormComponentProps {
  fieldsProps?: BaseFormWrapperProps;
  practiceInfo?: Practice.PracticeInfo;
  extraData?: any[];
}

const BaseFormWrapper = forwardRef<BaseFormWrapperRef, BaseFormWrapperProps>(
  ({ children, initialValues, ...restProps }, ref) => {
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({ ...form }));

    return (
      <Form form={form} initialValues={initialValues} {...restProps}>
        {children}
      </Form>
    );
  }
);

export default BaseFormWrapper;
