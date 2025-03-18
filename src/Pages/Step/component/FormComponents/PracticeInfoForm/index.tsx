import {
  Form,
  FormInstance,
  Input,
  Checkbox,
  Col,
  Row,
  ConfigProvider,
} from "antd";
import FormList from "@components/FormList";
import AzureUpload from "@components/AzureUpload";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";
import "./index.less";

const PracticeInfoForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const form = (fieldsProps?.ref?.current || {}) as FormInstance;
  const logoName = Form.useWatch("logo_name", form);
  const practiceLegalName = Form.useWatch("practice_legal_name", form);
  const address = Form.useWatch("address", form);

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="practice_legal_name"
            label="Practice Legal Name"
            rules={[
              { required: true, message: "Please input practice legal name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name={["address", "physical_address"]}
            label="Practice Physical Address"
            rules={[
              {
                required: true,
                message: "Please input practice physical address",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            name={["address", "city"]}
            label="City"
            rules={[
              {
                required: true,
                message: "Please input address city",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={["address", "state"]}
            label="State"
            rules={[
              {
                required: true,
                message: "Please input address state",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name={["address", "zip"]}
            label="Zip Code"
            rules={[
              {
                required: true,
                message: "Please input address zip code",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="business_contact_number"
            label="Business Contact Number"
            rules={[
              {
                required: true,
                message: "Please input business contact number",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormList
            name="taxonomy_codes"
            label="Taxonomy Code"
            tooltip="You can find your taxonomy code on the National Uniform Claim Committee code (NUCC) code set list. Link →"
            minCount={1}
            required={true}
          >
            {(field) => (
              <>
                <Form.Item
                  key={field.key}
                  name={field.name}
                  rules={[
                    {
                      required: true,
                      message: "Please input taxonomy code",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            )}
          </FormList>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={10}>
          <Form.Item
            name="display_name"
            label="Display Name on Youlify Portal, Receipt and Patient Statement"
            labelCol={{ span: 18 }}
            rules={[
              {
                required: true,
                message: "Please input display name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="logo_name"
            label="Practice Logo (SVG, PNG or JPG. 5mb max.)"
          >
            <AzureUpload accept=".png,.jpg,.jpeg,.svg" />
          </Form.Item>
          <Form.Item name="no_logo" valuePropName="checked">
            <ConfigProvider
              theme={{ components: { Checkbox: { fontSize: 12 } } }}
            >
              <Checkbox>My practice does not have a logo.</Checkbox>
            </ConfigProvider>
          </Form.Item>
        </Col>
        <Col span={14}>
          <div className="practice-info-form-preview">
            <div className="practice-info-form-preview-title">Preview</div>
            <div className="practice-info-form-preview-images">
              <div className="practice-info-form-preview-images-item">
                <img
                  src={require("@assets/images/preview-provider.png")}
                  alt="preview"
                />
                <div className="practice-info-form-preview-provider-position">
                  {!!logoName && (
                    <img
                      className="practice-info-form-preview-provider-position-icon"
                      src={logoName}
                      alt="preview-logo-name"
                    />
                  )}
                  <div className="practice-info-form-preview-provider-position-text">
                    {practiceLegalName}
                  </div>
                </div>
              </div>
              <div className="practice-info-form-preview-images-item">
                <img
                  src={require("@assets/images/preview-pdf.png")}
                  alt="preview"
                />
                <div className="practice-info-form-preview-pdf-position">
                  <div className="practice-info-form-preview-pdf-position-text">
                    {!!practiceLegalName && (
                      <span className="practice-info-form-preview-pdf-position-text--bold">
                        {practiceLegalName}
                        <br />
                      </span>
                    )}
                    {!!address?.physical_address && (
                      <span>
                        {address?.physical_address}
                        <br />
                      </span>
                    )}
                    {(address?.city || address?.state || address?.zip) && (
                      <span>
                        {address?.city}, {address?.state} {address?.zip}
                      </span>
                    )}
                  </div>
                  {!!logoName && (
                    <img
                      className="practice-info-form-preview-pdf-position-icon"
                      src={logoName}
                      alt="preview-logo-name"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </BaseFormWrapper>
  );
};

export default PracticeInfoForm;
