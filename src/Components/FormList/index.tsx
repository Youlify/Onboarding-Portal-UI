import { Button, Form, Input, Space, FormItemProps } from "antd";
import { CopyOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormListFieldData, FormListOperation } from "antd/es/form/FormList";

export interface FormListProps<T = any>
  extends Omit<FormItemProps, "children"> {
  label?: React.ReactNode;
  name: FormItemProps["name"];
  initialValue?: T[];
  maxCount?: number;
  minCount?: number;
  showLabel?: boolean;
  children?: (
    field: FormListFieldData,
    index: number,
    operation: FormListOperation
  ) => React.ReactNode;
  createDefaultItem?: (index: number) => T;
}

const FormList = <T extends object = any>(props: FormListProps<T>) => {
  const {
    label,
    name,
    initialValue,
    rules,
    maxCount,
    minCount,
    showLabel = false,
    children,
    createDefaultItem,
    ...formItemProps
  } = props;
  const form = Form.useFormInstance();

  const getDefaultItem = (index: number): T | string =>
    createDefaultItem ? createDefaultItem(index) : "";

  return (
    <Form.Item
      name={name}
      label={label}
      {...formItemProps}
      rules={[
        ...(rules || []),
        () => ({
          validator(_, value) {
            if (minCount !== undefined && (value?.length || 0) < minCount) {
              return Promise.reject(`At least ${minCount} items are required`);
            }
            if (maxCount !== undefined && (value?.length || 0) > maxCount) {
              return Promise.reject(`At most ${maxCount} items are allowed`);
            }
            return Promise.resolve();
          },
        }),
      ]}
      style={{ width: "100%", ...formItemProps.style }}
    >
      <Form.List name={name} initialValue={initialValue}>
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
                  type="default"
                  icon={<PlusOutlined />}
                  block={true}
                  disabled={isMaxReached}
                  onClick={() => operation.add(getDefaultItem(0))}
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
                <div
                  style={{ fontSize: 14, fontWeight: 500, color: "#1f1f1f" }}
                >
                  Max add {maxCount} (current {fields.length}/{maxCount})
                </div>
              )}
              <div className="ant-form-item-explain-connected">
                {errors?.map((error, i) => (
                  <div
                    key={i}
                    role="alert"
                    className="ant-form-item-explain-error"
                  >
                    {error}
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export default FormList;
