import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { moduleKeys, moduleConfig } from "@config/module";
import { useProgressPercentage, useProgressStatus } from "@/Hooks/useProgress";
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
  const { run: runGetProgressStatus, progressStatus } = useProgressStatus();

  const onTopBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };
  const goStep = (moduleInfo: Module.ModuleInfo) => {
    navigate(`/step?moduleKey=${moduleInfo.key}`);
  };

  const renderableModules = useMemo(() => {
    const daynamicModuleKeys = Object.keys(progressStatus);
    const daynamicModules = [] as (Module.ModuleInfo & {
      status: API.APIProgressModuleStatus;
    })[];
    moduleKeys.forEach((key) => {
      const moduleInfo = moduleConfig[key];
      const apiKey = moduleInfo.apiKey || "";
      if (daynamicModuleKeys.indexOf(apiKey) > -1) {
        daynamicModules.push({
          ...moduleInfo,
          status: progressStatus[apiKey],
        });
      }
    });
    return daynamicModules;
  }, [progressStatus]);

  useEffect(() => {
    runGetProgressPercentage();
    runGetProgressStatus();
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
          {renderableModules.map((renderableModule) => {
            return (
              <HomeModuleCard
                key={renderableModule.key}
                title={renderableModule.cardTitle}
                fillText={renderableModule.cardFillText}
                status={renderableModule.status.status}
                moduleInfo={renderableModule}
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
