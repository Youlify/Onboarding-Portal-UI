import { useState } from "react";
import { debounce } from "lodash";
import { Form, Input, Select, Radio, Col, Row } from "antd";
import { searchProcedureCode, searchNDCCode } from "@service/factory";
import FormList from "@components/FormList";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import { BaseOptionType } from "antd/es/select";

const AdditionalBillingInfoForm: React.FC<FormComponentProps> = ({
  fieldsProps,
}) => {
  const [procedureCodeOptions, setProcedureCodeOptions] = useState<
    BaseOptionType[]
  >([]);
  const [ndcCodeOptions, setNDCCodeOptions] = useState<BaseOptionType[]>([]);

  const debounceSearch = (type: "procedure_code" | "ndc_code") =>
    debounce(async (value: string) => {
      const api =
        type === "procedure_code" ? searchProcedureCode : searchNDCCode;
      let data = [] as API.APIProcedureCodeList | API.APINDCCode[];
      try {
        data = (await api({ query: value, limit: 100 })) || [];
      } catch (e) {
        console.log(e);
      }
      const options = data.map((item) => ({
        value: item.code,
        label: item.code,
      }));
      type === "procedure_code"
        ? setProcedureCodeOptions(options)
        : setNDCCodeOptions(options);
    }, 800);

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="need_cash_based_service"
            label="Do you need to take payments for cash based services, such as uncovered medications, form fees etc?"
            rules={[{ required: true, message: "Please select yes or no" }]}
          >
            <Radio.Group buttonStyle="solid" size="large">
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item dependencies={["need_cash_based_service"]} noStyle={true}>
        {({ getFieldValue }) =>
          getFieldValue("need_cash_based_service") && (
            <Row style={{ marginTop: 32 }}>
              <Col span={24}>
                <Form.Item
                  name="payment_info"
                  label="Can you give us a few examples of such transactions?"
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          )
        }
      </Form.Item>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Form.Item
            name="has_medication"
            label="Do you bill any medication (codes starting with J, such as J3301)? "
            rules={[{ required: true, message: "Please select yes or no" }]}
          >
            <Radio.Group buttonStyle="solid" size="large">
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item dependencies={["has_medication"]} noStyle={true}>
        {({ getFieldValue }) =>
          getFieldValue("has_medication") && (
            <Row style={{ marginTop: 32 }}>
              <Col span={24}>
                <FormList
                  name="medication_code_pairs"
                  label="Please list out all medications:"
                  minCount={1}
                  showDivider={false}
                  required={true}
                >
                  {(field) => (
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          key={field.key}
                          name={[field.name, "procedure_code"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select procedure code",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Search Procedure Code"
                            showSearch={true}
                            options={procedureCodeOptions}
                            onSearch={debounceSearch("procedure_code")}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          key={field.key}
                          name={[field.name, "ndc_code"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select NDC code",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Search NDC Code"
                            options={ndcCodeOptions}
                            showSearch={true}
                            onSearch={debounceSearch("ndc_code")}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                </FormList>
              </Col>
            </Row>
          )
        }
      </Form.Item>
    </BaseFormWrapper>
  );
};

export default AdditionalBillingInfoForm;
