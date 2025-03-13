import { PracticeStatusEnum } from "@/Types/enum";
import { practiceStatusConfig, PracticeInfo } from "@config/practice";
import "./index.less";

interface PracticeCardProps {
  status: PracticeStatusEnum;
  title: string;
  fillText?: string;
  practiceInfo: PracticeInfo;
  style?: React.CSSProperties;
  onClick?: (practiceInfo: PracticeInfo) => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  status,
  title,
  fillText,
  practiceInfo,
  style,
  onClick,
}) => {
  const statusMap = practiceStatusConfig[status];
  const { icon, text, textColor, bgColor } = statusMap;
  return (
    <div
      className="practice-card"
      style={{ backgroundColor: bgColor, ...style }}
      onClick={() => onClick?.(practiceInfo)}
    >
      <div className="practice-card-top">
        <div className="practice-card-status">
          <img className="practice-card-status-icon" src={icon} alt="icon" />
          <div
            className="practice-card-status-text"
            style={{ color: textColor }}
          >
            {text}
          </div>
        </div>
        <div className="practice-card-title">{title}</div>
      </div>
      <div className="practice-card-bottom">
        {fillText && <div className="practice-card-fill-text">{fillText}</div>}
      </div>
    </div>
  );
};

export default PracticeCard;
