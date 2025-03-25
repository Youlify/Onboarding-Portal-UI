import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useToken } from "@hooks/useToken";

interface LoginProviderProps {
  children: React.ReactElement;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useSearchParams();
  const { isLogin } = useToken();

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
