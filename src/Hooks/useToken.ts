import { useState } from "react";
import { useLocalStorageState, useCountDown } from "ahooks";
import { STORAGE_TOKEN_KEY } from "@common/contant";

const useToken = () => {
  const [token, setToken] = useLocalStorageState<Account.AccountInfo>(
    STORAGE_TOKEN_KEY,
    { listenStorageChange: true }
  );
  const isLogin = !!(token?.practiceId && token?.accessCode);
  return {
    token,
    setToken,
    isLogin,
  };
};

const useLogout = () => {
  const { setToken } = useToken();
  const [countDownLeftTime, setCountDownLeftTime] = useState<number>();
  const [countDownEndCallback, setCountDownEndCallback] =
    useState<() => void>();
  const logout = (callback?: () => void) => {
    setToken();
    setCountDownLeftTime(0);
    callback?.();
  };
  const autoLogoutStartUp = (leftTime: number, callback?: () => void) => {
    setCountDownLeftTime(leftTime);
    setCountDownEndCallback(callback);
  };
  useCountDown({
    leftTime: countDownLeftTime,
    onEnd: () => {
      logout(countDownEndCallback);
    },
  });
  return { logout, autoLogoutStartUp };
};

export { useToken, useLogout };
