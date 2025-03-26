import { useState, useEffect } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { Form, Checkbox, Col, Row, ConfigProvider, FormInstance } from "antd";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const StripeForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const form = fieldsProps?.ref?.current || ({} as FormInstance);
  const [scheduledChat, setScheduledChat] = useState("");

  useCalendlyEventListener({
    onEventScheduled(e) {
      if (e?.data?.event === "calendly.event_scheduled") {
        const inviteeUri = e.data?.payload?.invitee?.uri || "";
        form?.setFieldsValue({ scheduled_chat: inviteeUri });
      }
    },
  });

  useEffect(() => {
    const scheduledChat = fieldsProps?.initialValues?.scheduled_chat;
    form?.setFieldsValue?.({
      confirm_appointment: !!scheduledChat,
    });
    setScheduledChat(scheduledChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldsProps?.initialValues?.scheduled_chat]);

  return (
    <BaseFormWrapper layout="vertical" {...fieldsProps}>
      <div className="stripe-form-appointment">
        <Form.Item
          name="scheduled_chat"
          rules={[{ required: true, message: "Please book a meeting" }]}
          style={{ width: 1100 }}
        >
          <InlineWidget
            url={
              scheduledChat ||
              "https://calendly.com/sallyyoulify/15-minutes-video-meeting"
            }
            styles={{
              margin: "-80px 0 -420px -300px",
              minWidth: 320,
              height: 1200,
            }}
          />
        </Form.Item>
      </div>
      <Row>
        <Col span={24}>
          <ConfigProvider
            theme={{
              components: {
                Checkbox: { fontFamily: "Elza-Medium", fontSize: 18 },
              },
            }}
          >
            <Form.Item
              name="confirm_appointment"
              valuePropName="checked"
              rules={[
                { required: true, message: "Please confirm appointment" },
                { pattern: /^true$/, message: "Please confirm appointment" },
              ]}
            >
              <Checkbox>
                I have booked an appointment through the calendar above.
              </Checkbox>
            </Form.Item>
          </ConfigProvider>
        </Col>
      </Row>
    </BaseFormWrapper>
  );
};

export default StripeForm;
