import { useState, useRef } from "react";
import { Form, Button, ConfigProvider } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import AzureUpload, { AzureUploadRef } from "@components/AzureUpload";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

interface ClearingHouseFormFileViewProps {
  name: string;
  size?: string;
  style?: React.CSSProperties;
  renderRight?: () => React.ReactNode;
}

const ClearingHouseFormFileView: React.FC<ClearingHouseFormFileViewProps> = ({
  name,
  size,
  style,
  renderRight,
}) => {
  return (
    <div className="clearing-house-form-example-file" style={style}>
      <div className="clearing-house-form-example-file-left">
        <div className="clearing-house-form-example-file-icon">
          <div className="clearing-house-form-example-file-icon-image"></div>
        </div>
        <div className="clearing-house-form-example-file-info">
          <div className="clearing-house-form-example-file-info-name">
            {name}
          </div>
          <div className="clearing-house-form-example-file-info-size">
            {size}
          </div>
        </div>
      </div>
      <div className="clearing-house-form-example-file-right">
        {renderRight?.()}
      </div>
    </div>
  );
};

const ClearingHouseForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const [authorizationUploadUrl, setAuthorizationUploadUrl] = useState("");
  const azureUploadRef = useRef<AzureUploadRef>(null);

  const onAuthorizationDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(authorizationUploadUrl);
  };

  const onAuthorizationDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    azureUploadRef.current?.delete();
  };

  const onAuthorizationUploadChange = (url?: string) => {
    setAuthorizationUploadUrl(url || "");
  };

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <div className="clearing-house-form-step">
        <div className="clearing-house-form-step-title">Step1.</div>
        <div className="clearing-house-form-step-description">
          Download the Clearing House Authorization Form below.
        </div>
        <div className="clearing-house-form-step-content">
          <ClearingHouseFormFileView
            name="leaningHouse_ExamplePracticeName.pdf"
            size="120KB"
            renderRight={() => (
              <ConfigProvider
                theme={{
                  components: { Button: { controlHeight: 32, fontSize: 12 } },
                }}
              >
                <Button type="primary" icon={<DownloadOutlined />}>
                  Download Form
                </Button>
              </ConfigProvider>
            )}
          />
        </div>
      </div>
      <div className="clearing-house-form-step">
        <div className="clearing-house-form-step-title">Step2.</div>
        <div className="clearing-house-form-step-description">
          Print the Clearing House Authorization Form with your company
          letterhead, sign, and upload the scan.
          <br />
          <span className="clearing-house-form-step-description--dark">
            Letterhead should include the complete practice address.
          </span>
        </div>
        <div className="clearing-house-form-step-content">
          <Form.Item
            name="authorization_form"
            rules={[
              { required: true, message: "Please upload authorization form " },
            ]}
          >
            <AzureUpload
              ref={azureUploadRef}
              style={{ width: "auto" }}
              renderUnUploadView={() => (
                <div className="clearing-house-form-unupload">
                  <div className="clearing-house-form-unupload-icon">
                    <div className="clearing-house-form-unupload-icon-image"></div>
                  </div>
                  <div className="clearing-house-form-unupload-text">
                    Click to upload or drag and drop
                  </div>
                  <div className="clearing-house-form-unupload-size-text">
                    Max file size 10MB.
                  </div>
                </div>
              )}
              renderUploadedView={() => (
                <ClearingHouseFormFileView
                  name="leaningHouse_ExamplePracticeName.pdf"
                  size="120KB"
                  style={{ backgroundColor: "#E2EBFF" }}
                  renderRight={() => (
                    <div className="clearing-house-form-upload-operations">
                      <DownloadOutlined
                        className="clearing-house-form-upload-operations-download"
                        onClick={onAuthorizationDownload}
                      />
                      <DeleteOutlined onClick={onAuthorizationDelete} />
                    </div>
                  )}
                />
              )}
              onChange={onAuthorizationUploadChange}
            />
          </Form.Item>
        </div>
      </div>
    </BaseFormWrapper>
  );
};

export default ClearingHouseForm;
