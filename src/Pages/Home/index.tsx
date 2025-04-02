import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import { moduleKeys, moduleConfig } from "@config/module";
import { useProgressPercentage, useProgress } from "@hooks/useProgress";
import { useWorkflowCompletion } from "@hooks/useWorkflow";
import NavigationBar from "@components/NavigationBar";
import CircularProgress from "@components/CircularProgress";
import HomeModuleCard from "./ModuleCard";
import "./index.less";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [paddingTop, setPaddingTop] = useState(0);

  const { run: runGetProgressPercentage, progressPercentage } =
    useProgressPercentage();
  const {
    run: runGetProgress,
    progress,
    canSubmitReview,
    loading,
  } = useProgress();
  const { run: runSubmitWorkflow, messageContextHolder } =
    useWorkflowCompletion({
      success() {
        runGetProgress();
      },
    });

  const onNavigationBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };
  const goStep = (moduleInfo: Module.ModuleInfo) => {
    navigate(`/step?moduleKey=${moduleInfo.key}`);
  };

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
      <NavigationBar showBgLogo={false} onLayout={onNavigationBarLayout} />
      <div className="home-content">
        <div className="home-content-overview">
          <img
            className="home-content-overview-bglogo"
            alt="bglogo"
            src={require("../../Assets/images/youlify_logo_bg.png")}
          />
          <div className="home-content-overview-content">
            <div className="home-content-overview-text">
              <div className="home-content-overview-text-title">
                Welcome to the onboarding portal, California Medical Group!
              </div>
              <div className="home-content-overview-text-description">
                We need to collect some information from you to proceed
                further.Please don't hesitate to reach out to us anytime if you
                have any questions.
              </div>
            </div>
            <CircularProgress
              size="large"
              percentage={progressPercentage}
              style={{ marginLeft: 140 }}
            />
          </div>
        </div>
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
                disabled={!canSubmitReview}
                onClick={runSubmitWorkflow}
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
