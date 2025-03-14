import React from "react";
import { Button, Form, FormInstance } from "antd";
import "./index.less";

export interface DynamicFormProps {
  form: FormInstance;
}

interface StepFormProps {
  practiceInfo: Practice.PracticeInfo;
  style?: React.CSSProperties;
}

const StepForm: React.FC<StepFormProps> = ({ practiceInfo, style }) => {
  const { formTitle, formComponent } = practiceInfo;
  const [form] = Form.useForm();

  return (
    <div className="step-form-container" style={style}>
      <div className="step-form-main">
        <div className="step-form-title">{formTitle}</div>
        <div className="step-form-fields">
          <Form form={form} layout="vertical">
            {React.cloneElement(formComponent, { form })}
          </Form>
        </div>
      </div>
      <div className="step-form-toolbar">
        <div className="step-form-toolbar-left">
          <Button type="default" style={{ width: 200 }}>
            Back to Menu
          </Button>
        </div>
        <div className="step-form-toolbar-right">
          <Button color="primary" variant="outlined" style={{ width: 160 }}>
            Save
          </Button>
          <Button type="primary" style={{ marginLeft: 16, width: 160 }}>
            Save and Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepForm;
