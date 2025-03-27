import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spin, message, FormInstance } from "antd";
import { omit } from "lodash";
import { useRequest } from "ahooks";
import { moduleKeys } from "@config/module";
import { ModuleStatusEnum } from "@/Types/enum";
import { useProgress } from "@hooks/useProgress";
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
    needRefresh,
    onlyNext,
  } = moduleInfo;

  const { runAsync: runGetProgress, judgeCanSubmitReview } = useProgress();
  const { run: runInitDataApi, loading: initDataLoading } = useRequest(
    initDataApi!,
    {
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
    }
  );
  const { runAsync: runSubmitDataApi, loading: submitDataLoading } = useRequest(
    submitDataApi!,
    { manual: true }
  );
  const runExtraDataApis = async () => {
    try {
      const res = await Promise.all(extraDataApis!.map((api) => api?.()));
      setExtraData(res);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshData = useCallback(() => {
    if (initDataApi) runInitDataApi();
  }, [initDataApi, runInitDataApi]);

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
        if (needRefresh && !next) refreshData();
      }
      if (next) {
        const nextKey = getNextStepKey(moduleKeys, moduleInfo.key);
        if (nextKey === "last") {
          const progress = await runGetProgress();
          if (judgeCanSubmitReview(progress)) {
            navigate("/step/allDone");
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
          if (format) submitValues = format(formValues, formInitialValues);
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
      <Spin spinning={initDataLoading || submitDataLoading} fullscreen={true} />
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
            refreshData,
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
          {!formDisabled && !onlyNext ? (
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
