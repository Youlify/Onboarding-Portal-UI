import { useEffect, useRef } from "react";
import { useSize } from "ahooks";
import CircularProgress from "@components/CircularProgress";
import "./index.less";

interface HomeTopBarProps {
  progressPercentage?: number;
  onLayout?: (size: { width: number; height: number }) => void;
}

const HomeTopBar: React.FC<HomeTopBarProps> = ({
  progressPercentage = 0,
  onLayout,
}) => {
  const ref = useRef(null);
  const size = useSize(ref);

  useEffect(() => {
    const width = size?.width || 0;
    const height = size?.height || 0;
    onLayout?.({ width, height });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <div className="home-top-bar" ref={ref}>
      <img
        className="home-top-bar-bglogo"
        alt="bglogo"
        src={require("../../../Assets/images/youlify_logo_bg.png")}
      />
      <div className="home-top-bar-logo"></div>
      <div className="home-top-bar-content">
        <div className="home-top-bar-text">
          <div className="home-top-bar-text-title">
            Welcome to the onboarding portal, California Medical Group!
          </div>
          <div className="home-top-bar-text-description">
            We need to collect some information from you to proceed
            further.Please don't hesitate to reach out to us anytime if you have
            any questions.
          </div>
        </div>
        <CircularProgress
          size="large"
          percentage={progressPercentage}
          style={{ marginLeft: 140 }}
        />
      </div>
    </div>
  );
};

export default HomeTopBar;
