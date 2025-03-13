import { PracticeInfo } from "@config/practice";
import "./index.less";

interface StepBannerProps {
  practiceInfo: PracticeInfo;
  style?: React.CSSProperties;
}

const StepBanner: React.FC<StepBannerProps> = ({ practiceInfo, style }) => {
  const { bannerTitle, bannerSubTitle } = practiceInfo;
  const bannerTitleLines = bannerTitle?.split("\n");
  const bannerTitleSpans = bannerTitleLines.length
    ? bannerTitleLines.map((line, index) => {
        return (
          <span key={index}>
            <span>{line}</span>
            {index < bannerTitleLines.length - 1 && <br />}
          </span>
        );
      })
    : bannerTitle;
  return (
    <div className="step-banner-container" style={style}>
      <div className="step-banner-content">
        <div className="step-banner-title">{bannerTitleSpans}</div>
        <div className="step-banner-subtitle">{bannerSubTitle}</div>
      </div>
    </div>
  );
};

export default StepBanner;
