import { useState } from "react";
import { Form, Input, Select, Checkbox, Col, Row, Divider } from "antd";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const AccountTypeOptions = ["Checking", "Saving"].map((item) => ({
  value: item,
  label: item,
}));

const BankAccountsForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const [payBankAgreeChecked, setPayBankAgreeChecked] = useState(false);
  const [receiveBankAgreeChecked, setReceiveBankAgreeChecked] = useState(false);
  const [sameAsChecked, setSameAsChecked] = useState(false);
  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={["pay_bank", "name_of_bank"]}
            label="Name of bank"
            rules={[{ required: true, message: "Please input name of bank" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={["pay_bank", "account_type"]}
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
            name={["pay_bank", "bank_account_number"]}
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
            name={["pay_bank", "bank_routing_number"]}
            label="Bank Routing Number"
            rules={[
              { required: true, message: "Please input bank routing number" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 32 }}>
        <Col span={24}>
          <Checkbox
            checked={payBankAgreeChecked}
            onChange={(e) => setPayBankAgreeChecked(e.target.checked)}
          >
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
            name={["pay_bank", "sign_name"]}
            rules={[{ required: true, message: "Please input full name" }]}
          >
            <Input placeholder="Full Name Here" />
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
          <Checkbox
            checked={sameAsChecked}
            onChange={(e) => setSameAsChecked(e.target.checked)}
          >
            Same as Above
          </Checkbox>
        </Col>
      </Row>
      {!sameAsChecked && (
        <>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name={["receive_bank", "name_of_bank"]}
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
                name={["receive_bank", "account_type"]}
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
                name={["receive_bank", "bank_account_number"]}
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
                name={["receive_bank", "bank_routing_number"]}
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
          <Row style={{ marginTop: 32 }}>
            <Col span={24}>
              <Checkbox
                checked={receiveBankAgreeChecked}
                onChange={(e) => setReceiveBankAgreeChecked(e.target.checked)}
              >
                By typing my full name below, I authorize Youlify Inc to charge
                my bank account listed above for payment of all Youlify
                invoices. I further confirm that I have the necessary
                authorization to provide this consent on behalf of my company.
              </Checkbox>
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col span={24}>
              <Form.Item
                name={["receive_bank", "sign_name"]}
                rules={[{ required: true, message: "Please input full name" }]}
              >
                <Input placeholder="Full Name Here" />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </BaseFormWrapper>
  );
};

export default BankAccountsForm;
