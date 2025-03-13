import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSize } from "ahooks";
import "./index.less";

interface NavigationBarProps {
  title?: string;
  renderRight?: () => React.ReactElement;
  onLeftClick?: () => void;
  onLayout?: (size: { width: number; height: number }) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  renderRight,
  onLeftClick,
  onLayout,
}) => {
  const ref = useRef(null);
  const size = useSize(ref);
  const navigate = useNavigate();

  const onBarLeftClick = () => {
    onLeftClick ? onLeftClick() : navigate("/");
  };

  useEffect(() => {
    const width = size?.width || 0;
    const height = size?.height || 0;
    onLayout?.({ width, height });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <div className="navigation-bar" ref={ref}>
      <div className="navigation-bar-left" onClick={onBarLeftClick}>
        <div className="navigation-bar-logo"></div>
      </div>
      <div className="navigation-bar-right">{renderRight?.()}</div>
    </div>
  );
};

export default NavigationBar;
