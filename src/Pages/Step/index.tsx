import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { practiceConfig, PracticeKey } from "@config/practice";
import NavigationBar from "@components/NavigationBar";
import CircularProgress from "@components/CircularProgress";
import StepBanner from "./component/Banner";
import StepForm from "./component/Form";
import "./index.less";

const Step: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [paddingTop, setPaddingTop] = useState(0);
  const practiceKey = searchParams.get("practiceKey") as PracticeKey;
  const practiceInfo = practiceConfig?.[practiceKey];
  const onNavigationBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };
  const renderNaitonBarRight = () => {
    return <CircularProgress size="small" percentage={30} />;
  };

  return (
    <div className="step-container" style={{ paddingTop }}>
      <NavigationBar
        onLayout={onNavigationBarLayout}
        renderRight={renderNaitonBarRight}
      />
      <div className="step-content">
        <StepBanner practiceInfo={practiceInfo} />
        <StepForm practiceInfo={practiceInfo} style={{ flex: 1 }} />
      </div>
    </div>
  );
};

export default Step;
