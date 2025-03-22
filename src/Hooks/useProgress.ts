import { useState } from "react";
import { useRequest } from "ahooks";
import { getProgressPercentage, getProgressStatus } from "@service/factory";

const useProgressPercentage = () => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const isProgressPercentageCompleted = progressPercentage === 100;
  const { ...rest } = useRequest(getProgressPercentage, {
    manual: true,
    onSuccess(data) {
      setProgressPercentage(data || 0);
    },
    onError(e) {
      console.log(e);
    },
  });
  return {
    ...rest,
    progressPercentage,
    isProgressPercentageCompleted,
  };
};

const useProgressStatus = () => {
  const [progressStatus, setProgressStatus] = useState<API.APIProgressStatus>(
    {}
  );
  const { ...rest } = useRequest(getProgressStatus, {
    manual: true,
    onSuccess(data) {
      if (data) setProgressStatus(data);
    },
    onError(e) {
      console.log(e);
    },
  });
  return {
    ...rest,
    progressStatus,
  };
};

export { useProgressPercentage, useProgressStatus };
