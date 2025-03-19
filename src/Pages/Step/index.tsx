import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { moduleConfig } from "@/Config/module";
import { getProgressPercentage } from "@service/factory";
import NavigationBar from "@components/NavigationBar";
import CircularProgress from "@components/CircularProgress";
import StepBanner from "./component/Banner";
import StepForm from "./component/Form";
import "./index.less";

const Step: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [paddingTop, setPaddingTop] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const moduleKey = searchParams.get("moduleKey") as Module.ModuleKey;
  const moduleInfo = moduleConfig?.[moduleKey];

  const { run: runGetProgressPercentageApi } = useRequest(
    getProgressPercentage,
    {
      manual: true,
      onSuccess(data) {
        setProgressPercentage(data || 0);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  const onNavigationBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };

  const renderNaitonBarRight = () => {
    return <CircularProgress size="small" percentage={progressPercentage} />;
  };

  useEffect(() => {
    runGetProgressPercentageApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step-container" style={{ paddingTop }}>
      <NavigationBar
        onLayout={onNavigationBarLayout}
        renderRight={renderNaitonBarRight}
      />
      <div
        className="step-content"
        style={{ height: `calc(100% - ${paddingTop}px)` }}
      >
        <StepBanner moduleInfo={moduleInfo} />
        <StepForm moduleInfo={moduleInfo} style={{ flex: 1 }} />
      </div>
    </div>
  );
};

export default Step;
