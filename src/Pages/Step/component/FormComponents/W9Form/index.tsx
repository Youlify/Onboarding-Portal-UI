import { useState, useEffect } from "react";
import {
  Form,
  FormInstance,
  Input,
  Checkbox,
  Button,
  message,
  ConfigProvider,
  CheckboxChangeEvent,
} from "antd";
import { useRequest } from "ahooks";
import PdfPreview from "@components/PdfPreview";
import { pdfBlobDownload } from "@utils/download";
import { signW9Form } from "@service/factory";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const W9Form: React.FC<FormComponentProps> = ({
  fieldsProps,
  extraData,
  refreshData,
}) => {
  const form = (fieldsProps?.ref?.current || {}) as FormInstance;
  const initialValues = fieldsProps?.initialValues || {};
  const file_name = initialValues?.file_name;
  const basicInfo = extraData?.[0] || {};
  const address = basicInfo?.address;
  const [messageApi, contextHolder] = message.useMessage();
  const [isSigned, setIsSigned] = useState<boolean>();
  const [agreeChecked, setAgreeChecked] = useState(false);

  const { run: runSignW9Form } = useRequest(signW9Form, {
    manual: true,
    onSuccess() {
      messageApi.success("W-9 form signed success");
      refreshData?.();
    },
    onError(e) {
      messageApi.error(e.message);
    },
  });

  const onSignW9Form = async () => {
    try {
      const values = await form.validateFields();
      runSignW9Form({ ...values });
    } catch (e) {
      console.log(e);
    }
  };

  const onAgreeChange = (e: CheckboxChangeEvent) => {
    const agreeChecked = e.target.checked;
    setAgreeChecked(agreeChecked);
    if (!agreeChecked) form.setFieldsValue({ full_name: "" });
  };

  useEffect(() => {
    if (isSigned === false) form.setFieldsValue({ unsigned_w9: file_name });
    // eslint-disable-next-line
  }, [isSigned]);

  useEffect(() => {
    if (file_name?.includes("documents-signed")) {
      setIsSigned(true);
    } else if (file_name?.includes("documents-unsigned")) {
      setIsSigned(false);
    }
  }, [file_name]);

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      {contextHolder}
      <div className="w9-form-tips">
        Your new payment address for the Youlify-managed lockbox is: <br />
        <br />
        {address && (
          <span className="w9-form-tips--bold">
            {address?.physical_address}, <br />
            {address?.city}, {address?.state}, {address?.zip}
          </span>
        )}
        {typeof isSigned !== "undefined" && !isSigned && (
          <span>
            <br />
            <br />
            Below is the pre-populated W-9. Please review and sign.
          </span>
        )}
      </div>
      {typeof isSigned !== "undefined" && (
        <div className="w9-form-main">
          {isSigned ? (
            <div
              className="w9-form-signed"
              onClick={() => pdfBlobDownload(file_name, "W-9_Signed.pdf")}
            >
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
          ) : (
            <div className="w9-form-sign">
              <div className="w9-form-sign-pdf-preview">
                <PdfPreview pdfUrl={file_name} style={{ height: "100%" }} />
              </div>
              <div className="w9-form-sign-checkbox">
                <ConfigProvider
                  theme={{
                    components: {
                      Checkbox: { fontFamily: "Elza", fontSize: 14 },
                    },
                  }}
                >
                  <Checkbox checked={agreeChecked} onChange={onAgreeChange}>
                    By typing down my full name below, I agree to sign the above
                    W-9 on behalf of my practice.
                  </Checkbox>
                </ConfigProvider>
              </div>
              <Form.Item name="unsigned_w9" hidden={true}>
                <Input />
              </Form.Item>
              <div className="w9-form-sign-fullname">
                <Form.Item
                  name="full_name"
                  className="w9-form-sign-fullname-input"
                  rules={[
                    { required: true, message: "Please input your full name" },
                  ]}
                >
                  <Input
                    placeholder="Full Name Here"
                    disabled={!agreeChecked}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  style={{ width: 160 }}
                  disabled={!agreeChecked}
                  onClick={onSignW9Form}
                >
                  Sign
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </BaseFormWrapper>
  );
};

export default W9Form;
