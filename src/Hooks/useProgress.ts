import { useState } from "react";
import { useRequest } from "ahooks";
import { getProgressPercentage, getProgressStatus } from "@service/factory";

const useProgressPercentage = () => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const isProgressPercentageCompleted = progressPercentage === 100;
  const { run, runAsync } = useRequest(getProgressPercentage, {
    manual: true,
    onSuccess(data) {
      setProgressPercentage(data || 0);
    },
    onError(e) {
      console.log(e);
    },
  });
  return {
    run,
    runAsync,
    progressPercentage,
    isProgressPercentageCompleted,
  };
};

const useProgressStatus = (onFinally?: () => void) => {
  const [progressStatus, setProgressStatus] = useState({});
  const { run, runAsync } = useRequest(getProgressStatus, {
    manual: true,
    onSuccess(data) {
      if (data) setProgressStatus(data);
    },
    onError(e) {
      console.log(e);
    },
    onFinally() {
      onFinally?.();
    },
  });
  return {
    run,
    runAsync,
    progressStatus,
  };
};

export { useProgressPercentage, useProgressStatus };
