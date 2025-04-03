import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  FormInstance,
  Col,
  Row,
  ConfigProvider,
} from "antd";
import SectionsInput, {
  sectionsInputValidator,
} from "@components/SectionsInput";
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
  const form = fieldsProps?.ref?.current || ({} as FormInstance);
  const [taxClassification, setTaxClassification] = useState("");
  const [additionalInfoChecked, setAdditionalInfoChecked] = useState(false);
  const isIndividualSoleProprietor =
    taxClassification === "Individual/sole proprietor";

  const onTaxClassificationChange = (value: string) => {
    setTaxClassification(value);
    form?.setFieldsValue({ tax_id: "" });
  };

  useEffect(() => {
    setTaxClassification(fieldsProps?.initialValues?.tax_classification || "");
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
            label={
              <span>
                Please Select Your Federal Tax Classification. (Box 3a on{" "}
                <a
                  href="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#141414", textDecoration: "underline" }}
                >
                  W-9
                </a>
                )
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please select your federal tax classification.",
              },
            ]}
          >
            <Select
              options={TaxClassificationOptions}
              onChange={onTaxClassificationChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={10}>
          <Form.Item
            name="tax_id"
            label="Billing Tax ID"
            validateFirst={true}
            rules={[
              {
                required: true,
                message: "Please input billing tax id",
              },
              isIndividualSoleProprietor
                ? sectionsInputValidator(
                    [{ length: 3 }, { length: 2 }, { length: 4 }],
                    "tax_id"
                  )
                : sectionsInputValidator(
                    [{ length: 2 }, { length: 7 }],
                    "tax_id"
                  ),
            ]}
          >
            <SectionsInput
              sections={
                isIndividualSoleProprietor
                  ? [
                      { length: 3, inputProps: { placeholder: "000" } },
                      { length: 2, inputProps: { placeholder: "00" } },
                      { length: 4, inputProps: { placeholder: "0000" } },
                    ]
                  : [
                      { length: 2, inputProps: { placeholder: "00" } },
                      { length: 7, inputProps: { placeholder: "0000000" } },
                    ]
              }
            />
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
