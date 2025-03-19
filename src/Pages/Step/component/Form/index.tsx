import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, FormInstance } from "antd";
import { useRequest } from "ahooks";
import { moduleKeys } from "@/Config/module";
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
  if (currentIndex + 1 === moduleKeys.length) return null;
  return moduleKeys[currentIndex + 1];
};

const StepForm: React.FC<StepFormProps> = ({ moduleInfo, style }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [formInitialValues, setFormInitialValues] = useState({});
  const [extraData, setExtraData] = useState<any[]>([]);
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

  const { run: runInitDataApi } = useRequest(initDataApi!, {
    manual: true,
    onSuccess(data) {
      if (parse) data = parse(data);
      setFormInitialValues(data);
    },
    onError(e) {
      messageApi.error(e.message);
    },
  });
  const { run: runSubmitDataApi } = useRequest(submitDataApi!, {
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

  const onSaveOrNext =
    (onlySave = true) =>
    async () => {
      try {
        const formValues = await formComponentRef.current?.validateFields();
        let submitValues = formValues;
        if (format) submitValues = format(formValues);
        runSubmitDataApi({ ...submitValues });
        if (!onlySave) {
          const nextKey = getNextStepKey(moduleKeys, moduleInfo.key);
          if (nextKey) {
            navigate(`/step?practiceKey=${nextKey}`);
          } else {
            navigate("/", { replace: true });
          }
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
          <Button
            color="primary"
            variant="outlined"
            style={{ width: 160 }}
            onClick={onSaveOrNext(true)}
          >
            Save
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 16, width: 160 }}
            onClick={onSaveOrNext(false)}
          >
            Save and Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepForm;
