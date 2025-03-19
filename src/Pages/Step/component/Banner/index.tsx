import "./index.less";

interface StepBannerProps {
  moduleInfo: Module.ModuleInfo;
  style?: React.CSSProperties;
}

const StepBanner: React.FC<StepBannerProps> = ({ moduleInfo, style }) => {
  const { bannerTitle, bannerSubTitle } = moduleInfo;
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
