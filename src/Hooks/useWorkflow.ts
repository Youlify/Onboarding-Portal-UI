import { useRequest } from "ahooks";
import { message } from "antd";
import { workflowCompletion } from "@service/factory";

const useWorkflowCompletion = (payload?: { success?: () => void }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { ...rest } = useRequest(workflowCompletion, {
    manual: true,
    onSuccess() {
      messageApi.success("Workflow submit success");
      payload?.success?.();
    },
    onError(e) {
      messageApi.error(e.message);
    },
  });
  return {
    ...rest,
    messageContextHolder: contextHolder,
  };
};

export { useWorkflowCompletion };
