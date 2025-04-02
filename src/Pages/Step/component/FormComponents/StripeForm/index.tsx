import { useState, useMemo, useRef, useEffect } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { Form, Checkbox, Col, Row, ConfigProvider, FormInstance } from "antd";
import { useSize } from "ahooks";
import BaseFormWrapper, { FormComponentProps } from "../BaseFormWrapper";

const StripeForm: React.FC<FormComponentProps> = ({ fieldsProps }) => {
  const form = fieldsProps?.ref?.current || ({} as FormInstance);
  const [scheduledChat, setScheduledChat] = useState("");
  const appointmentEleRef = useRef<HTMLDivElement>(null);
  const appointmentEleSize = useSize(appointmentEleRef);
  const { width: appointmentEleWidth } = appointmentEleSize || { width: 0 };

  const appointmentEleHeight = useMemo(() => {
    let height = 0;
    if (appointmentEleWidth >= 1000) height = 680;
    else if (appointmentEleWidth >= 650) height = 1000;
    else height = 920;
    return height;
  }, [appointmentEleWidth]);

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
      <Form.Item
        name="scheduled_chat"
        rules={[{ required: true, message: "Please book a meeting" }]}
      >
        <div
          ref={appointmentEleRef}
          className="stripe-form-appointment"
          style={{ marginTop: -45, height: appointmentEleHeight }}
        >
          <InlineWidget
            url={
              scheduledChat ||
              "https://calendly.com/sallyyoulify/youlify-kick-off-call"
            }
            styles={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </Form.Item>
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
