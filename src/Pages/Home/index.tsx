import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import { moduleKeys, moduleConfig } from "@config/module";
import { useProgressPercentage, useProgress } from "@hooks/useProgress";
import { useWorkflowCompletion } from "@hooks/useWorkflow";
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
  const { run: runGetProgress, progress, loading } = useProgress();
  const { run: runSubmitWorkflow, messageContextHolder } =
    useWorkflowCompletion();

  const onTopBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };
  const goStep = (moduleInfo: Module.ModuleInfo) => {
    navigate(`/step?moduleKey=${moduleInfo.key}`);
  };
  const onSubmitWorkflow = () => runSubmitWorkflow();

  const renderableModules = useMemo(() => {
    const daynamicModuleKeys = Object.keys(progress);
    const daynamicModules = [] as Module.ModuleInfoWithProgress[];
    moduleKeys.forEach((key) => {
      const moduleInfo = moduleConfig[key];
      const apiKey = moduleInfo.apiKey || "";
      if (daynamicModuleKeys.indexOf(apiKey) > -1) {
        daynamicModules.push({
          ...moduleInfo,
          progress: progress[apiKey],
        });
      }
    });
    return daynamicModules;
  }, [progress]);

  useEffect(() => {
    runGetProgressPercentage();
    runGetProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-container" style={{ paddingTop }}>
      {messageContextHolder}
      <HomeTopBar
        progressPercentage={progressPercentage}
        onLayout={onTopBarLayout}
      />
      <div className="home-content">
        {loading ? (
          <Spin />
        ) : (
          <>
            <div className="home-content-module-list">
              {renderableModules.map((renderableModule) => {
                return (
                  <HomeModuleCard
                    key={renderableModule.key}
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
                onClick={onSubmitWorkflow}
              >
                Submit for Review
              </Button>
            </div>
          </>
        )}
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
