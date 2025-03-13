import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { practiceKeys, practiceConfig, PracticeInfo } from "@config/practice";
import { PracticeStatusEnum } from "@/Types/enum";
import HomeTopBar from "./TopBar";
import HomePracticeCard from "./PracticeCard";
import "./index.less";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [paddingTop, setPaddingTop] = useState(0);
  const onTopBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };
  const goStep = (practiceInfo: PracticeInfo) => {
    navigate(`/step?practiceKey=${practiceInfo.key}`);
  };

  return (
    <div className="home-container" style={{ paddingTop }}>
      <HomeTopBar onLayout={onTopBarLayout} />
      <div className="home-content">
        <div className="home-content-practice-list">
          {practiceKeys.map((key) => {
            const practiceInfo = practiceConfig[key];
            return (
              <HomePracticeCard
                key={practiceInfo.key}
                title={practiceInfo.cardTitle}
                fillText={practiceInfo.cardFillText}
                status={PracticeStatusEnum.NOT_STARTED}
                practiceInfo={practiceInfo}
                onClick={goStep}
              />
            );
          })}
        </div>
        <div className="home-content-footer">
          <div className="home-content-footer-left">
            Copyright © 2024-2025 Youlify. All rights reserved.
          </div>
          <a
            className="home-content-footer-right"
            href="mailto:support@youlify.ai"
          >
            support@youlify.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
