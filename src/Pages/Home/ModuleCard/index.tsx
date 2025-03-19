import { ModuleStatusEnum } from "@/Types/enum";
import { moduleStatusConfig } from "@/Config/module";
import "./index.less";

interface ModuleCardProps {
  status: ModuleStatusEnum;
  title: string;
  fillText?: string;
  moduleInfo: Module.ModuleInfo;
  style?: React.CSSProperties;
  onClick?: (moduleInfo: Module.ModuleInfo) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  status,
  title,
  fillText,
  moduleInfo,
  style,
  onClick,
}) => {
  const statusMap = moduleStatusConfig[status];
  const { icon, text, textColor, bgColor } = statusMap;
  return (
    <div
      className="module-card"
      style={{ backgroundColor: bgColor, ...style }}
      onClick={() => onClick?.(moduleInfo)}
    >
      <div className="module-card-top">
        <div className="module-card-status">
          <img className="module-card-status-icon" src={icon} alt="icon" />
          <div className="module-card-status-text" style={{ color: textColor }}>
            {text}
          </div>
        </div>
        <div className="module-card-title">{title}</div>
      </div>
      <div className="module-card-bottom">
        {fillText && <div className="module-card-fill-text">{fillText}</div>}
      </div>
    </div>
  );
};

export default ModuleCard;
