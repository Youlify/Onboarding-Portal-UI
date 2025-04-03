import { forwardRef, useImperativeHandle } from "react";
import { Form, FormProps, FormInstance } from "antd";

export interface BaseFormWrapperRef extends FormInstance {}

export interface BaseFormWrapperProps extends FormProps {
  ref: React.RefObject<BaseFormWrapperRef>;
  children: React.ReactNode;
}

export interface FormComponentProps {
  fieldsProps?: BaseFormWrapperProps;
  moduleInfo?: Module.ModuleInfo;
  extraData?: any[];
  refreshData?: () => void;
}

const BaseFormWrapper = forwardRef<BaseFormWrapperRef, BaseFormWrapperProps>(
  ({ children, ...restProps }, ref) => {
    const [defaultForm] = Form.useForm();
    const form = restProps?.form || defaultForm;

    useImperativeHandle(ref, () => ({ ...form }));

    return (
      <Form form={form} {...restProps}>
        {children}
      </Form>
    );
  }
);

export default BaseFormWrapper;
