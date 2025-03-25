import { useState } from "react";
import { useRequest } from "ahooks";
import { getProgressPercentage, getProgress } from "@service/factory";

const useProgressPercentage = () => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const isProgressPercentageCompleted = progressPercentage === 100;
  const { ...rest } = useRequest(getProgressPercentage, {
    manual: true,
    onSuccess(data) {
      setProgressPercentage(data?.percentage || 0);
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

const useProgress = () => {
  const [progress, setProgress] = useState<API.APIProgress>({});
  const { ...rest } = useRequest(getProgress, {
    manual: true,
    onSuccess(data) {
      if (data) setProgress(data);
    },
    onError(e) {
      console.log(e);
    },
  });
  return {
    ...rest,
    progress,
  };
};

export { useProgressPercentage, useProgress };
