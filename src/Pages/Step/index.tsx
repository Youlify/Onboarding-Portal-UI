import { useState, useEffect } from "react";
import { useOutlet } from "react-router-dom";
import useProgressPercentage from "@hooks/useProgressPercentage";
import NavigationBar from "@components/NavigationBar";
import CircularProgress from "@components/CircularProgress";
import "./index.less";

const Step: React.FC = () => {
  const [paddingTop, setPaddingTop] = useState(0);
  const { run: runGetProgressPercentage, progressPercentage } =
    useProgressPercentage();

  const onNavigationBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };

  const renderNaitonBarRight = () => {
    return <CircularProgress size="small" percentage={progressPercentage} />;
  };

  useEffect(() => {
    runGetProgressPercentage();
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
        {useOutlet()}
      </div>
    </div>
  );
};

export default Step;
