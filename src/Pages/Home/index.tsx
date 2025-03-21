import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { moduleKeys, moduleConfig } from "@config/module";
import { ModuleStatusEnum } from "@/Types/enum";
import useProgressPercentage from "@hooks/useProgressPercentage";
import HomeTopBar from "./TopBar";
import HomeModuleCard from "./ModuleCard";
import "./index.less";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [paddingTop, setPaddingTop] = useState(0);
  const {
    run: runGetProgressPercentage,
    progressPercentage,
    isProgressPercentageCompleted,
  } = useProgressPercentage();
  const onTopBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };
  const goStep = (moduleInfo: Module.ModuleInfo) => {
    navigate(`/step?moduleKey=${moduleInfo.key}`);
  };

  useEffect(() => {
    runGetProgressPercentage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-container" style={{ paddingTop }}>
      <HomeTopBar
        progressPercentage={progressPercentage}
        onLayout={onTopBarLayout}
      />
      <div className="home-content">
        <div className="home-content-module-list">
          {moduleKeys.map((key) => {
            const moduleInfo = moduleConfig[key];
            return (
              <HomeModuleCard
                key={moduleInfo.key}
                title={moduleInfo.cardTitle}
                fillText={moduleInfo.cardFillText}
                status={ModuleStatusEnum.NOT_STARTED}
                moduleInfo={moduleInfo}
                onClick={goStep}
              />
            );
          })}
        </div>
        <div className="home-content-submit">
          <Button
            color="primary"
            variant="solid"
            style={{ width: 228 }}
            disabled={!isProgressPercentageCompleted}
          >
            Submit for Review
          </Button>
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
