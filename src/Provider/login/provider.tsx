import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useDocumentVisibility } from "ahooks";
import { useToken, useLogout } from "@hooks/useToken";
import { AUTO_LOGOUT_LEFT_TIME } from "@common/contant";

interface LoginProviderProps {
  children: React.ReactElement;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useSearchParams();
  const documentVisibility = useDocumentVisibility();
  const { isLogin } = useToken();
  const { autoLogoutStartUp } = useLogout();

  useEffect(() => {
    if (documentVisibility === "hidden" && isLogin)
      autoLogoutStartUp(AUTO_LOGOUT_LEFT_TIME);
    else autoLogoutStartUp(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentVisibility]);

  useEffect(() => {
    if (!isLogin && location.pathname !== "/login") {
      const redirect = `${location.pathname}${location.search}`;
      const redirectUrl = encodeURIComponent(redirect);
      navigate(`/login?redirect=${redirectUrl}`, { replace: true });
    } else if (isLogin && location.pathname === "/login") {
      const redirectUrl = search.get("redirect");
      const redirect = redirectUrl ? decodeURIComponent(redirectUrl) : "/";
      navigate(redirect, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return <>{children}</>;
};

export { LoginProvider };
