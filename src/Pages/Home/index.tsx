import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { moduleKeys, moduleConfig } from "@/Config/module";
import { ModuleStatusEnum } from "@/Types/enum";
import HomeTopBar from "./TopBar";
import HomeModuleCard from "./ModuleCard";
import "./index.less";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [paddingTop, setPaddingTop] = useState(0);
  const onTopBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };
  const goStep = (moduleInfo: Module.ModuleInfo) => {
    navigate(`/step?moduleKey=${moduleInfo.key}`);
  };

  return (
    <div className="home-container" style={{ paddingTop }}>
      <HomeTopBar onLayout={onTopBarLayout} />
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
