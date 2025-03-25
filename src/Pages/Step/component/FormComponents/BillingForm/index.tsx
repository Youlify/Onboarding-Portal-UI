import { useState, useEffect } from "react";
import { Form, Input, Select, Checkbox, Col, Row, ConfigProvider } from "antd";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const TaxClassificationOptions = [
  "Individual/sole proprietor",
  "C corporation",
  "S corporation",
  "Partnership",
  "Trust/estate",
  "LLC. tax as    C",
  "LLC. tax as S",
  "LLC. tax as P",
  "Other",
].map((item) => ({ label: item, value: item }));

const BasicTemplateForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const [additionalInfoChecked, setAdditionalInfoChecked] = useState(false);

  useEffect(() => {
    setAdditionalInfoChecked(
      fieldsProps?.initialValues?.additional_info ? true : false
    );
  }, [fieldsProps?.initialValues]);

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="tax_classification"
            label="Please Select Your Federal Tax Classification. (Box 3a on W-9)"
            rules={[
              {
                required: true,
                message: "Please select your federal tax classification.",
              },
            ]}
          >
            <Select options={TaxClassificationOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={10}>
          <Form.Item
            name="tax_id"
            label="Billing Tax ID"
            rules={[
              {
                required: true,
                message: "Please input billing tax id",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            name="npi"
            label="Billing NPI"
            rules={[
              {
                required: true,
                message: "Please input billing NPI",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <ConfigProvider
            theme={{
              components: {
                Checkbox: { fontFamily: "Elza-Semibold", fontSize: 16 },
              },
            }}
          >
            <Checkbox
              checked={additionalInfoChecked}
              onChange={(e) => setAdditionalInfoChecked(e.target.checked)}
            >
              We have more than one billing Tax ID and/or billing NPI.{" "}
              <span style={{ fontFamily: "Elza", color: "#A7ADB9" }}>
                (not common)
              </span>
            </Checkbox>
          </ConfigProvider>
        </Col>
        {additionalInfoChecked && (
          <Col span={24} style={{ marginTop: 24 }}>
            <Form.Item
              name="additional_info"
              label={
                <span style={{ fontFamily: "Elza", fontSize: 14 }}>
                  Please provide your other Tax ID and/or billing NPI and
                  explain when you use them.
                </span>
              }
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        )}
      </Row>
    </BaseFormWrapper>
  );
};

export default BasicTemplateForm;
