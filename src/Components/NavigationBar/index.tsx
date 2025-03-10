import React, { useEffect, useRef } from "react";
import { useSize } from "ahooks";
import "./index.less";

interface NavigationBarProps {
  title?: string;
  renderRight?: () => React.ReactElement;
  onLayout?: (size: { width: number; height: number }) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  renderRight,
  onLayout,
}) => {
  title = title || "Payment portal";
  const ref = useRef(null);
  const size = useSize(ref);

  useEffect(() => {
    const width = size?.width || 0;
    const height = size?.height || 0;
    onLayout?.({ width, height });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return (
    <div className="navigation-bar" ref={ref}>
      <div className="navigation-bar-left">
        <div className="navigation-bar-logo"></div>
      </div>
      <div className="navigation-bar-right">{renderRight?.()}</div>
    </div>
  );
};

export default NavigationBar;
