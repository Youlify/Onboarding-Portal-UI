import { Button, Form, Input, Space, FormItemProps } from "antd";
import { CopyOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormListFieldData, FormListOperation } from "antd/es/form/FormList";

export interface FormListProps<T = any>
  extends Omit<FormItemProps, "children"> {
  label?: React.ReactNode;
  name: FormItemProps["name"];
  children?: (
    field: FormListFieldData,
    index: number,
    operation: FormListOperation
  ) => React.ReactNode;
  initialValue?: T[];
  maxCount?: number;
  minCount?: number;
  showLabel?: boolean;
  createDefaultItem?: (index: number) => T;
}

const FormList = <T extends object = any>(props: FormListProps<T>) => {
  const {
    label,
    name,
    children,
    initialValue,
    maxCount,
    minCount,
    showLabel = false,
    createDefaultItem,
    ...formItemProps
  } = props;
  const form = Form.useFormInstance();

  const getDefaultItem = (index: number): T | string =>
    createDefaultItem ? createDefaultItem(index) : "";

  return (
    <Form.Item
      label={label}
      {...formItemProps}
      style={{ width: "100%", ...formItemProps.style }}
    >
      <Form.List name={name as any} initialValue={initialValue}>
        {(fields, operation, { errors }) => {
          const isMaxReached =
            maxCount !== undefined && fields.length >= maxCount;
          const isMinReached =
            minCount !== undefined && fields.length <= minCount;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                width: "100%",
              }}
            >
              {fields.length === 0 && (
                <Button
                  type="dashed"
                  onClick={() => operation.add(getDefaultItem(0))}
                  icon={<PlusOutlined />}
                  block
                  disabled={isMaxReached}
                >
                  Add New
                </Button>
              )}
              {fields.map((field, index) => (
                <div key={field.key} style={{ width: "100%" }}>
                  <div
                    key={field.key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        maxWidth: "calc(100% - 120px)",
                      }}
                    >
                      {children ? (
                        children(field, index, operation)
                      ) : (
                        <Form.Item
                          {...field}
                          label={`Field ${index + 1}`}
                          name={[field.name]}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Please enter" />
                        </Form.Item>
                      )}
                    </div>
                    <Space
                      style={{
                        marginTop: showLabel ? 28 : 0,
                        marginLeft: 16,
                        flexShrink: 0,
                        opacity: fields.length > 1 ? 1 : 0.6,
                      }}
                    >
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        disabled={isMaxReached}
                        onClick={() =>
                          operation.add(getDefaultItem(index + 1), index + 1)
                        }
                      />
                      <Button
                        type="text"
                        icon={<CopyOutlined />}
                        disabled={isMaxReached}
                        onClick={() => {
                          const currentValue = form.getFieldValue([
                            name as string,
                            index,
                          ]);
                          operation.add(currentValue, index + 1);
                        }}
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        disabled={isMinReached}
                        onClick={() => operation.remove(index)}
                      />
                    </Space>
                  </div>
                </div>
              ))}
              {maxCount && (
                <div style={{ fontSize: 12, color: "#666666" }}>
                  Max add {maxCount} (current {fields.length}/{maxCount})
                </div>
              )}
              {errors && (
                <div className="ant-form-item-explain-error">{errors}</div>
              )}
            </div>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export default FormList;
