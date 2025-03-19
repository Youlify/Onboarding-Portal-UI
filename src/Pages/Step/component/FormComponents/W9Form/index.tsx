import { useState } from "react";
import { Form, Input, Checkbox, Button, ConfigProvider } from "antd";
import PdfPreview from "@/Components/PdfPreview";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const W9Form: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const [agreeChecked, setAgreeChecked] = useState(false);
  const initialValues = fieldsProps?.initialValues || {};
  const file_name = initialValues?.file_name;

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <div className="w9-form-tips">
        Your new payment address for the Youlify-managed lockbox is: <br />
        <br />
        <span className="w9-form-tips--bold">
          Sample Street, <br />
          Sample City, State, Zip Code
        </span>
        <span>
          <br />
          <br />
          Below is the pre-populated W-9. Please review and sign.
        </span>
      </div>
      <div className="w9-form-main">
        {!file_name ? (
          <div className="w9-form-sign">
            <div className="w9-form-sign-pdf-preview">
              <PdfPreview
                pdfUrl="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
                style={{ height: "100%" }}
              />
            </div>
            <div className="w9-form-sign-checkbox">
              <ConfigProvider
                theme={{
                  components: {
                    Checkbox: { fontFamily: "Elza", fontSize: 14 },
                  },
                }}
              >
                <Checkbox
                  checked={agreeChecked}
                  onChange={(e) => setAgreeChecked(e.target.checked)}
                >
                  By typing down my full name below, I agree to sign the above
                  W-9 on behalf of my practice.
                </Checkbox>
              </ConfigProvider>
            </div>
            <div className="w9-form-sign-fullname">
              <Form.Item
                name="full_name"
                className="w9-form-sign-fullname-input"
              >
                <Input placeholder="Full Name Here" />
              </Form.Item>
              <Button type="primary" style={{ width: 160 }}>
                Sign
              </Button>
            </div>
          </div>
        ) : (
          <div className="w9-form-signed">
            <div className="w9-form-signed-file">
              <div className="w9-form-signed-file-icon"></div>
              <div className="w9-form-signed-file-info">
                <div className="w9-form-signed-file-info-name">
                  W-9_Signed.pdf
                </div>
                <div className="w9-form-signed-file-info-size">120KB</div>
              </div>
            </div>
            <div className="w9-form-signed-download"></div>
          </div>
        )}
      </div>
    </BaseFormWrapper>
  );
};

export default W9Form;
