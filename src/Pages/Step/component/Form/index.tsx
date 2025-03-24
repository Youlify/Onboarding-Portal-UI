import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, FormInstance } from "antd";
import { omit } from "lodash";
import { useRequest } from "ahooks";
import { moduleKeys } from "@config/module";
import { ModuleStatusEnum } from "@/Types/enum";
import { useProgressPercentage } from "@hooks/useProgress";
import {
  FormComponentProps,
  BaseFormWrapperRef,
} from "../FormComponents/BaseFormWrapper";
import "./index.less";

export interface DynamicFormProps {
  form: FormInstance;
}

interface StepFormProps {
  moduleInfo: Module.ModuleInfo;
  style?: React.CSSProperties;
}

const getNextStepKey = (
  moduleKeys: Module.ModuleKeys,
  currentKey: Module.ModuleKey
) => {
  const currentIndex = moduleKeys.indexOf(currentKey);
  if (currentIndex === -1) return null;
  if (currentIndex + 1 === moduleKeys.length) return "last";
  return moduleKeys[currentIndex + 1];
};

const StepForm: React.FC<StepFormProps> = ({ moduleInfo, style }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [formInitialValues, setFormInitialValues] = useState({});
  const [extraData, setExtraData] = useState<any[]>([]);
  const [formDisabled, setFormDiabled] = useState(false);
  const formComponentRef = useRef<BaseFormWrapperRef>(null);
  const {
    formTitle,
    formComponent,
    initDataApi,
    submitDataApi,
    format,
    parse,
    extraDataApis,
  } = moduleInfo;

  const { runAsync: runGetProgressPercentage } = useProgressPercentage();
  const { run: runInitDataApi } = useRequest(initDataApi!, {
    manual: true,
    onSuccess(data) {
      if (parse) data = parse(data);
      const status = data.status as ModuleStatusEnum;
      const formDisabled =
        status === ModuleStatusEnum.IN_REVIEW ||
        status === ModuleStatusEnum.APPROVED;
      data = omit(data, "status");
      setFormInitialValues(data);
      setFormDiabled(formDisabled);
      formComponentRef.current?.setFieldsValue(data);
    },
    onError(e) {
      messageApi.error(e.message);
    },
  });
  const { runAsync: runSubmitDataApi } = useRequest(submitDataApi!, {
    manual: true,
    onSuccess(data) {
      console.log(data);
    },
    onError(e) {
      messageApi.error(e.message);
    },
  });
  const runExtraDataApis = async () => {
    try {
      const res = await Promise.all(extraDataApis!.map((api) => api?.()));
      setExtraData(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onGoBack = () => {
    navigate("/", { replace: true });
  };

  const callAPIOrNext = async (
    { save, next }: { save: boolean; next: boolean },
    submitValues?: any
  ) => {
    try {
      if (save && submitDataApi) {
        await runSubmitDataApi({ ...submitValues });
        messageApi.success("Save success");
      }
      if (next) {
        const nextKey = getNextStepKey(moduleKeys, moduleInfo.key);
        if (nextKey === "last") {
          const res = await runGetProgressPercentage();
          if (res?.percentage === 100) {
            navigate("/stepDone");
          } else {
            navigate("/", { replace: true });
          }
        } else if (nextKey === null) {
          navigate("/", { replace: true });
        } else {
          navigate(`/step?moduleKey=${nextKey}`);
        }
      }
    } catch (e) {
      messageApi.error((e as Error).message);
    }
  };

  const onSaveOrNext =
    ({ save, next }: { save: boolean; next: boolean }) =>
    async () => {
      try {
        if (save) {
          const formValues = await formComponentRef.current?.validateFields();
          let submitValues = formValues;
          if (format) submitValues = format(formValues);
          if (submitDataApi) await runSubmitDataApi({ ...submitValues });
          callAPIOrNext({ save, next }, submitValues);
        } else {
          callAPIOrNext({ save, next });
        }
      } catch (e) {
        console.log(e);
      }
    };

  useEffect(() => {
    if (extraDataApis?.length) runExtraDataApis();
    // eslint-disable-next-line
  }, [extraDataApis]);

  useEffect(() => {
    if (initDataApi) runInitDataApi();
    // eslint-disable-next-line
  }, [initDataApi]);

  return (
    <div className="step-form-container" style={style}>
      {contextHolder}
      <div className="step-form-main">
        <div className="step-form-title">{formTitle}</div>
        <div className="step-form-fields">
          {React.cloneElement(formComponent, {
            fieldsProps: {
              ref: formComponentRef,
              initialValues: formInitialValues,
              disabled: formDisabled,
            },
            moduleInfo,
            extraData,
          } as FormComponentProps)}
        </div>
      </div>
      <div className="step-form-toolbar">
        <div className="step-form-toolbar-left">
          <Button type="default" style={{ width: 200 }} onClick={onGoBack}>
            Back to Menu
          </Button>
        </div>
        <div className="step-form-toolbar-right">
          {!formDisabled ? (
            <>
              <Button
                color="primary"
                variant="outlined"
                style={{ width: 160 }}
                onClick={onSaveOrNext({ save: true, next: false })}
              >
                Save
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 16, width: 160 }}
                onClick={onSaveOrNext({ save: true, next: true })}
              >
                Save and Next
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              style={{ marginLeft: 16, width: 160 }}
              onClick={onSaveOrNext({ save: false, next: true })}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepForm;
