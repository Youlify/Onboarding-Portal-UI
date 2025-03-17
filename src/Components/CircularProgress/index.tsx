import "./index.less";

interface CircularProgressProps {
  size?: "small" | "large";
  percentage?: number;
  style?: React.CSSProperties;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = "large",
  percentage = 0,
  style,
}) => {
  const isSmall = size === "small";
  const radius = isSmall ? 32 : 90;
  const strokeWidth = isSmall ? 6 : 12;
  const circleStrokeWidth = isSmall ? 2 : 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`circular-progress circular-progress--${size}`}
      style={style}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#A9C5FF"
          fill="transparent"
          strokeWidth={circleStrokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#ffffff"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="circular-progress-content">
        <div className="circular-progress-content-percentage">
          {percentage}%
        </div>
        {size === "large" && (
          <div className="circular-progress-content-text">Completed</div>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
