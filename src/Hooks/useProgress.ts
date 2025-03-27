import { useState } from "react";
import { useRequest } from "ahooks";
import { getProgressPercentage, getProgress } from "@service/factory";
import { ModuleStatusEnum } from "@/Types/enum";

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
  const [canSubmitReview, setCanSubmitReview] = useState(false);
  const judgeCanSubmitReview = (progress?: API.APIProgress) => {
    const keys = Object.keys(progress || {});
    let canSubmitReview = false;
    let hasOneOfNotSubmitted = false;
    let hasOneOfCompleted = false;
    for (let i of keys) {
      const status = progress?.[i]?.status;
      if (
        [ModuleStatusEnum.COMPLETED, ModuleStatusEnum.APPROVED].indexOf(
          status
        ) < 0
      ) {
        hasOneOfNotSubmitted = true;
        break;
      }
      if (status === ModuleStatusEnum.COMPLETED) hasOneOfCompleted = true;
    }
    if (!hasOneOfNotSubmitted && hasOneOfCompleted) canSubmitReview = true;
    setCanSubmitReview(canSubmitReview);
    return canSubmitReview;
  };
  const { ...rest } = useRequest(getProgress, {
    manual: true,
    onSuccess(data) {
      if (data) setProgress(data);
    },
    onError(e) {
      console.log(e);
    },
    onFinally(_, data) {
      judgeCanSubmitReview(data);
    },
  });
  return {
    ...rest,
    progress,
    canSubmitReview,
    judgeCanSubmitReview,
  };
};

export { useProgressPercentage, useProgress };
