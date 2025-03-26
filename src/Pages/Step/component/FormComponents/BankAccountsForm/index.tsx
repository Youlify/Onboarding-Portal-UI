import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Col,
  Row,
  Divider,
  CheckboxChangeEvent,
  FormInstance,
} from "antd";
import { UploadFile } from "antd/lib";
import { AzureContainerConfig } from "@config/azure";
import AzureUpload from "@components/AzureUpload";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const AccountTypeOptions = ["Checking", "Saving"].map((item) => ({
  value: item,
  label: item,
}));

const BankAccountsFormUploadView = ({ filename }: { filename?: string }) => {
  return (
    <div className="bank-accounts-form-upload">
      {filename ? (
        <div>{filename}</div>
      ) : (
        <div className="bank-accounts-form-upload-text">
          Click to Select File
        </div>
      )}
      <div className="bank-accounts-form-upload-icon"></div>
    </div>
  );
};

const BankAccountsForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const form = fieldsProps?.ref?.current || ({} as FormInstance);
  const initialValues = fieldsProps?.initialValues || {};
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [uploadFileNames, setUploadFileNames] = useState(["", ""]);
  const onUploadFileChange =
    (type: "payBank" | "receiveBank") => (file?: UploadFile) => {
      const fileName = file?.name || "";
      if (type === "payBank") {
        setUploadFileNames([fileName, uploadFileNames[1]]);
      } else {
        setUploadFileNames([uploadFileNames[0], fileName]);
      }
    };

  const onAgreeCheckedChange = (e: CheckboxChangeEvent) => {
    const agreeChecked = e.target.checked;
    setAgreeChecked(agreeChecked);
    if (!agreeChecked) {
      form?.setFieldsValue({ signed_name: "" });
    }
  };

  useEffect(() => {
    setAgreeChecked(!!initialValues?.signed_name);
  }, [initialValues?.signed_name]);

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={["pay_bank_info", "bank_name"]}
            label="Name of bank"
            rules={[{ required: true, message: "Please input name of bank" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={["pay_bank_info", "account_type"]}
            label="Account Type"
            rules={[{ required: true, message: "Please input account type" }]}
          >
            <Select options={AccountTypeOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={["pay_bank_info", "account_number"]}
            label="Bank Account Number"
            rules={[
              { required: true, message: "Please input bank account number" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={["pay_bank_info", "routing_number"]}
            label="Bank Routing Number"
            rules={[
              { required: true, message: "Please input bank routing number" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name={["pay_bank_info", "bank_letter"]}
            label="A Void Check or Bank Letter"
            rules={[{ required: true, message: "Please upload file" }]}
          >
            <AzureUpload
              style={{ width: "100%" }}
              renderUnUploadView={() => <BankAccountsFormUploadView />}
              renderUploadedView={() => (
                <BankAccountsFormUploadView filename={uploadFileNames[0]} />
              )}
              onFileChange={onUploadFileChange("payBank")}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Checkbox checked={agreeChecked} onChange={onAgreeCheckedChange}>
            By typing my full name below, I authorize Youlify Inc to charge my
            bank account listed above for payment of all Youlify invoices. I
            further confirm that I have the necessary authorization to provide
            this consent on behalf of my company.
          </Checkbox>
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Form.Item
            name="signed_name"
            rules={[{ required: true, message: "Please input sign name" }]}
          >
            <Input placeholder="Full Name Here" disabled={!agreeChecked} />
          </Form.Item>
        </Col>
      </Row>
      <Divider style={{ margin: "60px 0 48px", backgroundColor: "#898E9A" }} />
      <div
        style={{ fontFamily: "Elza-Semibold", fontSize: 20, color: "#141414" }}
      >
        Bank Account to Receive Payments from Insurance Companies and Patients
      </div>
      <Row style={{ padding: "48px 0" }}>
        <Col span={24}>
          <Form.Item name="is_same" valuePropName="checked">
            <Checkbox>Same as Above</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item dependencies={["is_same"]}>
        {({ getFieldValue }) =>
          !getFieldValue("is_same") && (
            <>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name={["receive_bank_info", "bank_name"]}
                    label="Name of bank"
                    rules={[
                      { required: true, message: "Please input name of bank" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={["receive_bank_info", "account_type"]}
                    label="Account Type"
                    rules={[
                      { required: true, message: "Please input account type" },
                    ]}
                  >
                    <Select options={AccountTypeOptions} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name={["receive_bank_info", "account_number"]}
                    label="Bank Account Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input bank account number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={["receive_bank_info", "routing_number"]}
                    label="Bank Routing Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input bank routing number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name={["receive_bank_info", "bank_letter"]}
                    label="A Void Check or Bank Letter"
                    rules={[{ required: true, message: "Please upload file" }]}
                  >
                    <AzureUpload
                      containerName={
                        AzureContainerConfig.ONBOARDING_DOCUMENTS.containerName
                      }
                      sasToken={
                        AzureContainerConfig.ONBOARDING_DOCUMENTS.sasToken
                      }
                      style={{ width: "100%" }}
                      renderUnUploadView={() => <BankAccountsFormUploadView />}
                      renderUploadedView={() => (
                        <BankAccountsFormUploadView
                          filename={uploadFileNames[1]}
                        />
                      )}
                      onFileChange={onUploadFileChange("receiveBank")}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )
        }
      </Form.Item>
    </BaseFormWrapper>
  );
};

export default BankAccountsForm;
