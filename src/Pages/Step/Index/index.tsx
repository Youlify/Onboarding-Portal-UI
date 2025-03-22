import { useSearchParams } from "react-router-dom";
import { moduleConfig } from "@config/module";
import StepBanner from "../component/Banner";
import StepForm from "../component/Form";

const StepIndex: React.FC = () => {
  const [searchParams] = useSearchParams();
  const moduleKey = searchParams.get("moduleKey") as Module.ModuleKey;
  const moduleInfo = moduleConfig?.[moduleKey];

  if (!moduleInfo) return null;

  return (
    <>
      <StepBanner moduleInfo={moduleInfo} />
      <StepForm moduleInfo={moduleInfo} style={{ flex: 1 }} />
    </>
  );
};

export default StepIndex;
