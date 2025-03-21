import { useState } from "react";
import { useRequest } from "ahooks";
import { getProgressPercentage } from "@service/factory";

const useProgressPercentage = () => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const isProgressPercentageCompleted = progressPercentage === 100;
  const { run } = useRequest(getProgressPercentage, {
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
    progressPercentage,
    isProgressPercentageCompleted,
  };
};

export default useProgressPercentage;
