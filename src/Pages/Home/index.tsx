import React, { useState } from "react";
import { useOutlet } from "react-router-dom";
import NavigationBar from "@components/NavigationBar";
import { useLogout } from "@hooks/useToken";
import { ReactComponent as LogoutSVG } from "../../Assets/images/logout.svg";
import "./index.less";

const NavigationBarRight = () => {
  const { logout } = useLogout();
  const onLogout = () => {
    logout();
  };
  return (
    <div className="navigation-bar-logout" onClick={onLogout}>
      <div className="navigation-bar-logout-text">Log Out</div>
      <LogoutSVG className="navigation-bar-logout-icon" />
    </div>
  );
};

const Home: React.FC = () => {
  const outlet = useOutlet();
  const [paddingTop, setPaddingTop] = useState(0);
  const onNavigationBarLayout = (size: { width: number; height: number }) => {
    setPaddingTop(size.height);
  };

  return (
    <div className="home-container" style={{ paddingTop }}>
      <NavigationBar
        renderRight={() => <NavigationBarRight />}
        onLayout={onNavigationBarLayout}
      />
      {outlet}
    </div>
  );
};

export default Home;
